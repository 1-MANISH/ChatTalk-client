import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { grayColor, orange } from '../constants/color.js'
import {AttachFile as AttachFileIcon,Send as SendIcon} from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import FileMenu from '../components/dialogs/FileMenu'
import MessageComponent from '../components/shared/MessageComponent'
import { getSocket } from '../socket.jsx'
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/event.js'
import { useGetChatDetailsQuery, useGetMyMessagesQuery } from '../redux/api/api.js'
import toast from 'react-hot-toast'
import { useErrors, useSocketEvents } from '../hooks/hook.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {useInfiniteScrollTop} from "6pp"
import { setIsFileMenu } from '../redux/reducers/misc.js'
import { removeNewMessagesAlert } from '../redux/reducers/chat.js'
import { TypingLoader } from '../components/layout/Loaders.jsx'
import { useNavigate } from 'react-router-dom'


const Chat = ({chatId}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = getSocket()

  const {user} = useSelector((store)=>store.authReducer)

  const containerRef = useRef(null)
  const bottomRef = useRef(null)
  

  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([])
  const [page,setPage] = useState(1)
  const [fileMenuAnchor,setFileMenuAnchor] = useState(null)

  const [imTyping,setImTyping] = useState(false)
  const [userTyping,setUserTyping] = useState(false)
  const typingTimeoutRef = useRef(null)

  const chatDetails = useGetChatDetailsQuery({chatId,populate:false,skip:!chatId})
  const members = chatDetails?.data?.chat?.members

  const oldMessagesChunk = useGetMyMessagesQuery({chatId,page})
  const {data:oldMessages,setData:setOldMessages} = useInfiniteScrollTop(containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
  )

  // errors array
  const errors = [{
      isError:chatDetails.isError,
      error:chatDetails.error,
    },{
      isError:oldMessagesChunk.isError,
      error:oldMessagesChunk.error
  }]



  useEffect(()=>{

    socket.emit(CHAT_JOINED,{userId:user._id,members})

    //cleanup function => when component unmount & useEffect chal rhaa ho dobara
    dispatch(removeNewMessagesAlert({chatId}))

    return () => {
      setMessage("")
      setMessages([])
      setOldMessages([])
      setPage(1)
      socket.emit(CHAT_LEAVED,{userId:user._id,members})
    }


  },[chatId])

    // useEffect

  useEffect(() => {
      if(chatDetails?.isError){
        return navigate("/")
        }
  },[chatDetails.isError])

  useEffect(() => {
      bottomRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])


 
  const submitHandler = async (e) => {
    e.preventDefault()
    
    try {
      if(!message.trim()) return;

      // new message event trigger - to server

      socket.emit(NEW_MESSAGE,{
        chatId,
        members,
        message,
      })

      setMessage("")

      toast.success("Message sent successfully")
    } catch (error) {
      toast.error(error?.message || "Something went wrong")
    }
  
  }
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }
  const messageOnChangeHandler = (e) => {
    setMessage(e.target.value)
    if(!imTyping) {
      socket.emit(START_TYPING,{members,chatId})
      setImTyping(true)
    }

    if(typingTimeoutRef.current) 
      clearTimeout(typingTimeoutRef.current)

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit(STOP_TYPING,{members,chatId})
      setImTyping(false)
    }, 2000);
    
  }

  // socket event handler/listener

  const newMessagesHandler = useCallback((data) => {
    if(data?.chatId !== chatId) 
      return
    setMessages((prev)=>[...prev,data.message])
  },[chatId])

  const startTypingHandler = useCallback((data) => {
    if(data?.chatId !== chatId) 
      return
    setUserTyping(true)
    
  },[chatId])
  
  const stopTypingHandler = useCallback((data) => {
    if(data?.chatId !== chatId) 
      return
    setUserTyping(false)
  },[chatId])

  const alertHandler = useCallback((data) => {
      

    if(chatId !== data.chatId) 
      return

    const messageForAlert = {
      content:data.message,
      sender:{
        _id:'admin',
        name:`Admin`,
        avatar:'https://i.pravatar.cc/300',
      },
      chat:data.chatId,
      createdAt:new Date().toISOString(),
    }

    setMessages((prev)=>[...prev,messageForAlert])
   
  },[chatId])



  // events array for listening event from backend 
  const eventsArray = [
    {
      event:NEW_MESSAGE,
      handler:newMessagesHandler
    },{
      event:START_TYPING,
      handler:startTypingHandler
    },
    {
      event:STOP_TYPING,
      handler:stopTypingHandler
    },{
      event:ALERT,
      handler:alertHandler
    }
  ]

  // sockets event handler hook
  useSocketEvents(socket,eventsArray)

  // Error
  useErrors(errors)


  const allMessages = [
    ...oldMessages,
    ...messages

  ]


  return chatDetails.isLoading ? (
    <Skeleton variant="rectangular" height={"100vh"}/>
  ): (
    <Fragment>

      <Stack 
        ref={containerRef}
        boxSizing={'border-box'}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowY:"auto",
          overflowX:"hidden",
        }}

      >
        {/* Messages Render*/}


        {
          allMessages?.map((data,index)=>(
            <MessageComponent 
              key={index} 
              message={data}
              user={user}
            />
          ))
        }


        {
          userTyping && (
            <TypingLoader/>
          )
        }

        <div ref={bottomRef}/>


      </Stack>

      <form
        style={{
          height:"10%",
          width:"100%",
          
        }}
        onSubmit={submitHandler}
      >

        <Stack 
          direction={"row"}
          padding={"1rem"}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position:"absolute",
              left:"1.5rem",
              rotate:"38deg",
              
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon/>
          </IconButton>

          <InputBox 
            placeholder='Type a message'
            value={message}
            onChange={messageOnChangeHandler}
          />

          <IconButton 
            type='submit'
            sx={{
              rotate:"-38deg",
              color:"white",
              bgcolor:orange,
              borderRadius:"50%",
              marginLeft:"1rem",
              padding:"0.5rem",
              "&:hover":{
                bgcolor:"error.dark"
              },
              
            }}
            
            >
            <SendIcon/>
          </IconButton>

        </Stack>

      </form>

      {/* File Menus */}

      <FileMenu 
          anchorE1={fileMenuAnchor}
          chatId={chatId}
      />

    </Fragment>
  )
}

export default AppLayout()(Chat)