import React from 'react'
import { LinkStyle } from '../styles/StyledComponents'
import { Box, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import AvatarCard from './AvatarCard'
import {motion} from "framer-motion"


const ChatItem = ({
    avatar=[],
    name,
    _id, 
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChat,

}) => {
  return (
    <LinkStyle 
        to={`/chat/${_id}`} 
        onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}
        sx={{
            padding:"0"
        }}
        >
        <motion.div
            initial={{opacity:0,y:"-100%"}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.1+index*0.1}}
             style={{
                display:"flex",
                alignItems:"center",
                padding:"1rem",
                backgroundColor:sameSender ? "black" : "unset",
                color:sameSender ? "white" : "unset",
                gap:"1rem",
                position:"relative",
            
            }}
        >

            <AvatarCard avatar={avatar}/>

            <Stack>
                <Typography>{name}</Typography>
                {
                    newMessageAlert && (
                        <Typography >{newMessageAlert?.count} New Messages</Typography>
                    )
                }
            </Stack>

            {
                isOnline && (
                    <Box 
                        sx={{
                            width:"10px",
                            height:"10px",
                            backgroundColor:"green",
                            borderRadius:"50%",
                            position:"absolute",
                            top:"50%",
                            right:"1rem",
                            transform:"translateY(-50%)"
                        }}
                    />
                )
            }

        </motion.div>
    
    </LinkStyle>
  )
}

export default memo(ChatItem)