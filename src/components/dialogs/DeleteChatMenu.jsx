import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc'
import { 
    ExitToApp as ExitToAppIcon,
    Delete as DeleteIcon

} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAsyncMutation } from '../../hooks/hook'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'

const DeleteChatMenu = ({dispatch,deleteMenuAnchor}) => {

    const navigate = useNavigate()

    const {isDeleteMenu,selectedDeleteChat} = useSelector((store)=>store.miscReducer)
    const [deleteChat,_,deleteChatData] = useAsyncMutation(useDeleteChatMutation)
    const [leaveGroup,__,leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)

    const isGroup = selectedDeleteChat?.groupChat
    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false))
        deleteMenuAnchor.current = null
    }

    const leaveGroupHandler = () => {

        closeHandler()
        leaveGroup("Leaving group...",selectedDeleteChat?.chatId)

    }
    const deleteChatHandler = () => {
        closeHandler()
        deleteChat("Deleting chat...",selectedDeleteChat?.chatId)

    }

    useEffect(()=>{
        if(deleteChatData || leaveGroupData){
            navigate("/")
        }

    },[deleteChatData,leaveGroupData])

  return (
    <Menu
        open={isDeleteMenu}
        onClose={closeHandler}    
        anchorEl={deleteMenuAnchor.current}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
    >

        <Stack
            sx={{
                width:"10rem",
                padding:"0.5rem",
                cursor:"pointer",
            }}
            direction={"row"}
            alignContent={"center"}
            spacing={"0.5rem"}
            onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
        >

            {
                isGroup ? (
                    <>
                        <ExitToAppIcon /> 
                        <Typography>Leave Group</Typography>
                    </>
                ):(
                    <>
                        <DeleteIcon /> 
                        <Typography>Delete Chat</Typography>
                    </>
                )
            }
        </Stack>

    </Menu>
  )
}

export default DeleteChatMenu