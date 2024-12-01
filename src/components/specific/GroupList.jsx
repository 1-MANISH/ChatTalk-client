import { Stack, Typography } from '@mui/material'
import React from 'react'
import GroupListItem from '../shared/GroupListItem'

const GroupList = ({w="100%",myGroups=[],chatId}) => {
  return (
    
    <Stack
        spacing={".3rem"}
        gap={".2rem"}
        width={w}
        boxSizing={"border-box"}
        height={"100vh"}
        overflow={"auto"}

    >
        {
            myGroups.length > 0 ? myGroups.map((group,index)=>{
                return (
                    <GroupListItem key={index} group={group} chatId={chatId} />
                )  
            })
            : (
                <Typography 
                    variant='h5' 
                    textAlign={"center"}
                    padding={"1rem"}
                >
                    No groups found
                </Typography>
            )
        }

    </Stack>
  )
}

export default GroupList