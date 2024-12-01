import { Stack } from '@mui/material'
import React, { memo, useEffect } from 'react'
import ChatItem from '../shared/ChatItem'


const ChatList = ({
    w="100%" , 
    chats=[] , 
    chatId ,
    onlineUsers=[] ,
    newMessagesAlert = [
        {
            chatId:"",
            count:0,
        }
    ],
    handleDeleteChat ,
}) => {


  return (
    <Stack
        width={w}
        direction="column"
        height={"100vh"}  
    >
        {
           chats?.map((data,index)=>{

                const {avatar,name,_id,groupChat,members} = data
                const newMessageAlert = newMessagesAlert?.find((data)=>data.chatId === _id)
                const isOnline = members?.some((member)=>onlineUsers.includes(member))
                
                return (
                    <ChatItem 
                        key={_id} 
                        _id={_id}
                        name={name}
                        avatar={avatar}
                        groupChat={groupChat}
                        sameSender={chatId === _id}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        handleDeleteChat={handleDeleteChat}
                        index={index}

                    />
                )
           })  
        }

    </Stack>
  )
}

export default memo( ChatList)