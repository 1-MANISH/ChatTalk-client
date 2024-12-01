import { Avatar, Button, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'

const NotificationItem = ({_id,sender,handler}) => {

    const {name,avatar} = sender
  return (
    <ListItem >
        <Stack
            direction={"row"} 
            alignItems={"center"} 
            spacing={"1rem"} 
            width={`100%`}
        >
            <Avatar src={avatar} sx={{width:50,height:50}}/>
            <Typography
                variant='body1'
                sx={{
                    flexGrow:1,
                    display:"-webkit-box",
                    WebkitLineClamp:1,
                    WebkitBoxOrient:"vertical",
                    overflow:"hidden",
                    textOverflow:"ellipsis"
                }}
            >
                {`${name} has sent you a friend request`}
            </Typography>

            <Stack direction={{
                xs:"column",
                sm:"row"
            }}>
                <Button onClick={() => handler({_id,accept:true})}>Accept</Button>
                <Button onClick={() => handler({_id,accept:false})} color='error'>Reject</Button>
            </Stack>
            
        </Stack>
     </ListItem>
  )
}

export default memo(NotificationItem)