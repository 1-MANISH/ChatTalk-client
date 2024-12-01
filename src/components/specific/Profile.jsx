import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon

} from '@mui/icons-material'
import moment from 'moment'
import { transformImage } from '../../lib/feature'

const Profile = ({user}) => {

  
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}  >

        <Avatar 
          sx={{
            width:200,
            height:200,
            objectFit:"contain",
            marginBottom:"1rem",
            border:"5px solid white"
            }} 
            
            src={transformImage(user?.avatar?.url)}
            alt={user?.name}
            />
        <ProfileCard heading={"Bio"} text={user?.bio}/>
        <ProfileCard heading={"Username"} text={user?.username} Icon={UserNameIcon}/>
        <ProfileCard heading={"Name"} text={user?.name} Icon={FaceIcon}/>
        <ProfileCard heading={"joined"} text={moment(user?.createdAt).fromNow()} Icon={CalendarIcon}/>

    </Stack>
  )
}

const ProfileCard = ({text,Icon,heading}) => {
  return (
    <Stack 
      direction={"row"} 
      alignItems={"center"} 
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}

    >

      {
        Icon && <Icon />
      }

      <Stack  >
        <Typography variant="body1">{text}</Typography>
        <Typography variant="caption" color='gray'>{heading}</Typography>
       
      </Stack>

    </Stack>
  )
}

export default Profile