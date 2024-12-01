import React, { memo } from 'react'
import { LinkStyle } from '../styles/StyledComponents'
import { Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
const GroupListItem = ({group,chatId}) => {

    const {name,avatar,_id} = group

  return (
    <LinkStyle 
        to={`?group=${_id}`} 
        onClick={(e)=>{
            if(chatId === _id) 
                e.preventDefault()
        }}
        sx={{
           position:"relative",
           padding:"1rem",
        }}
    >
        <Stack 
            direction={"row"} 
            alignItems={"center"} 
            spacing={"1rem"}
            gap={"1rem"}

        >
            <AvatarCard avatar={avatar}  />

            <Typography variant='h6'>{name}</Typography>

        </Stack>
    </LinkStyle>
  )
}

export default memo(GroupListItem)