import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import Grid from '@mui/material/Grid2';
import ChatList from '../specific/ChatList';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/api/api.js';
import { Drawer, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobileMenu, setSelectedDeleteChat } from '../../redux/reducers/misc.js';
import { useErrors, useSocketEvents } from '../../hooks/hook.jsx';
import {getSocket} from "../../socket"
import {  NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/event.js';
import { incrementNotificationCount,setNewMessagesAlert } from '../../redux/reducers/chat.js';
import { getOrSaveFromStorage } from '../../lib/feature.js';
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx';

const AppLayout = () => WrappedComponent => {

  return (props)=>{

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // SOCKET 
    const socket = getSocket()
    const deleteMenuAnchor = useRef(null)

    const [ onlineUsers, setOnlineUsers ] = useState([])

    const chatId = params.chatId

    const {isMobileMenu} = useSelector((store)=>store.miscReducer)
    const {user:currentUser} = useSelector((store)=>store.authReducer)
    const {newMessagesAlert} = useSelector((store)=>store.chatReducer)

    const {isLoading,data,isError,error,refetch} = useMyChatsQuery("")
     
    // some useEffect error handling
    useErrors ([{isError,error}])

    // useEffect
    useEffect(() => {
     
      getOrSaveFromStorage({
        key:NEW_MESSAGE_ALERT,
        value:newMessagesAlert,
      })
      
    }, [newMessagesAlert])
    

    const handleDeleteChat = (e,_id,groupChat) => {
      // right click
      e.preventDefault()
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectedDeleteChat({
        chatId:_id,
        groupChat
      }))
      deleteMenuAnchor.current = e.currentTarget
    }

    const handleMobileClose = () => {
       dispatch(setIsMobileMenu(false))
    }

    // for notification
    // events array for listening event from backend 

    const newMessagesAlertHandler = useCallback((data) => {
        // const chatIdToAlert = data?.chatId

        if(data?.chatId === chatId)
           return
        dispatch(setNewMessagesAlert(data)) // vhaa payload.chatId lengee thats why
        
    },[chatId])

    const newRequestHandler = useCallback(() => {
      // notification for new request to that user
      dispatch(incrementNotificationCount())
      
    },[dispatch])

    const refetchHandler = useCallback(() => {
      refetch()
      navigate("/")
    },[refetch,navigate])

    const onlineUsersHandler = useCallback((data) => {
      setOnlineUsers(data)
    },[])


    const eventsArray = [
      {
        event:NEW_MESSAGE_ALERT,
        handler:newMessagesAlertHandler
      },
      {
        event:NEW_REQUEST,
        handler:newRequestHandler
      },{
        event:REFETCH_CHATS,
        handler:refetchHandler
      },{
        event:ONLINE_USERS,
        handler:onlineUsersHandler
      }
    ]

    // sockets event handler hook
    useSocketEvents(socket,eventsArray)

  
    return (
      <>
        <Title />
        <Header/>

        {
          isLoading ? (
            <Skeleton variant="rectangular" height={"100vh"}/>
          ):(
            <Drawer
              open={isMobileMenu}
              onClose={handleMobileClose}
            >
              <ChatList 
                w={"70vw"}
                chats={data?.chats} 
                chatId={chatId} 
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            </Drawer>
          )
        }

        <Grid container height={"100vh"} >

          <Grid 
            item 
            size={{sm:4,md:3}} 
            sx={{
                display: { xs: "none", sm: "block" },
                overflow:"auto",
                height:"100%"
            }} 

          >
            {
              isLoading ? (
                <Skeleton variant="rectangular" height={"100vh"}/>
              ):(
                <ChatList 
                  chats={data?.chats} 
                  chatId={chatId} 
                  handleDeleteChat={handleDeleteChat}
                  newMessagesAlert={newMessagesAlert}
                  onlineUsers={onlineUsers}
                />
              ) 
            }
            
          </Grid>

          <Grid 
            item 
            size={{xs:12,sm:8,md:5,lg:6}} 
            height={"100%"}
            >
                <WrappedComponent {...props} chatId={chatId} />

          </Grid>

          <Grid 
            item 
            size={{md:4,lg:3}} 
            height={"100%"}
            sx={{
                display: { xs: "none", md: "block" },
                padding:"2rem",
                bgcolor:"rgba(0,0,0,0.85)"
            }}
            >
                <Profile user={currentUser}/>

          </Grid>
        

        </Grid>

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

      </>
    )
  }
}

export default AppLayout