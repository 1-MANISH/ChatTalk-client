import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon } from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { 
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Message as MessageIcon
  
} from '@mui/icons-material'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import {useErrors} from '../../hooks/hook'
import { useGetAdminDashboardStatsQuery } from '../../redux/api/api'

const Dashboard = () => {



  const {isLoading,data,error} = useGetAdminDashboardStatsQuery()
  const {stats} = data || {}
  
  // error handling
  useErrors([{
    isError:error,
    error:error
  }])
  
  const usersCount = stats?.usersCount
  const totalChatsCount = stats?.totalChatsCount
  const messagesCount = stats?.messagesCount
  const doughnutData = [stats?.totalChatsCount-stats?.groupsCount,stats?.groupsCount]
  const lineChartData = stats?.messagesChart


  const AppBar = (<Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin:"3rem 0",
      borderRadius:"1rem"
    }}
  >
   <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
    >
      <AdminPanelSettingsIcon sx={{fontSize:"3rem"}} />
      <SearchField placeholder='Search' />
      <CurveButton >Search</CurveButton>

      <Box flexGrow={1} />

      <Typography 
        variant='caption'
        fontSize={"1.1rem"}
        display={{
          xs:"none",
          lg:"block"
        }}
      >
          {moment().format("dddd, MMMM Do YYYY")}
      </Typography>
      <IconButton>
        <NotificationsIcon />
      </IconButton>

    </Stack>
  </Paper>)
  
  const Widgets = (<Stack
    direction={{
      xs:"column",
      sm:"row"
    }}
    spacing="2rem"
    justifyContent={"space-between"}
    alignItems={"center"}
    margin={"2rem 0"}
  >
      <Widget title={"Users"} value={usersCount} Icon={<PersonIcon />}  />
      <Widget title={"Chats"} value={totalChatsCount} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={messagesCount} Icon={<MessageIcon />}  />
  
  </Stack>
  )
  
  

  return  (
    <AdminLayout >
      {
        isLoading ? (
          <Skeleton variant="rectangular" height={"100vh"} />
        ) :(
          <Container
          component={"main"}
        >
  
          {AppBar}
  
          <Stack
            direction={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            gap={{
              xs:"2rem",
              sm:"1rem"
            }}
          >
  
            <Paper
              elevation={3}
              sx={{
                padding:"2rem 3.5rem",
                borderRadius:"1rem",
                width:"100%",
                maxWidth:"45rem",
               
              }}
            >
              <Typography m={"2rem 0"} variant='h4'>Last Messages</Typography>
             
              <LineChart valueArray={lineChartData || []}/>
  
            </Paper>
  
            <Paper
              elevation={3}
              sx={{
                padding:"1rem",
                borderRadius:"1rem",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                width:{
                  xs:"100%",
                  sm:"50%"
                },
                position:"relative",
                width:"100%",
                maxWidth:"25rem",
               
              }}
            >
             <DoughnutChart 
              labels={["Single Chats","Group Chats"]}
              valueArray={doughnutData || []}
             
             />
  
             <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
                height={"100%"}
             
             >
                <GroupIcon  />
                <Typography variant='h5'>Vs</Typography>
                <PersonIcon />
  
             </Stack>
  
            </Paper>
  
          </Stack>
  
          {
            Widgets
          }
  
  
          </Container>
        )
      }
    </AdminLayout>
  )
}


export const Widget = ({title,value,Icon}) => {
  return (
    <Paper
    elevation={3}
    sx={{
      padding:"2rem",
      margin:"2rem 0",
      borderRadius:"1.5rem",
      width:"20rem",
    }}
      
    > 
      
     <Stack
        alignItems={"center"}
        spacing={"1rem"}
        
      >

        <Typography 
          variant='h6'
          sx={{
            color:"rgba(0,0,0,0.7)",
            borderRadius:"50%",
            border:"5px solid rgba(0,0,0,0.9)",
            width:"5rem",
            height:"5rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          {value}
        </Typography>
        <Stack 
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
        >
            {Icon}
             <Typography>{title}</Typography>
        </Stack>

     </Stack>

    </Paper>
  )
}


export default Dashboard