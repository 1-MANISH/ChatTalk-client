import React, { useState } from 'react'
import { Box, Drawer, Grid2 as Grid, IconButton, Stack, Typography} from '@mui/material'
import { grayColor } from '../../constants/color.js'
import { 
    Menu as MenuIcon,
    Close as CloseIcon, 
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material'
import { Navigate, useLocation } from 'react-router-dom'
import { adminTabs } from '../../constants/route.jsx'
import { LinkStyle } from '../styles/StyledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../../redux/thunks/admin.js'



const AdminLayout = ({children}) => {

    const {isAdmin} = useSelector((store)=>store.authReducer)

    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => {
        setIsMobile(prev => !prev)
    }

    const handleClose = () => {
        setIsMobile(false)
    }

    if(!isAdmin){
        return <Navigate to="/admin/" />
    }
  return (
    <Grid container minHeight={"100vh"}>

        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            top: "1rem",
            right: "1rem",
          }}
        >

            <IconButton onClick={handleMobile}>
                {
                    isMobile ? <CloseIcon/> : <MenuIcon/>
                }
            </IconButton>
        </Box>

        <Grid
          item
          size={{
             md: 4,
             lg:3,
          }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
            <SideBar/>

        </Grid>

        <Grid
          item
          size={{
             xs:12,
             md: 8,
             lg:9,
          }}
          sx={{
            bgcolor:grayColor
          }}
        >
            {children}
        </Grid>

        <Drawer
          open={isMobile}
          onClose={handleClose}
        >
            <SideBar w={"50vw"}/>
        </Drawer>

    </Grid>
  )
}

const SideBar = ({w="100%"}) => {

    const dispatch = useDispatch()

    const location = useLocation()

    const logoutHandler = () => {
        dispatch(adminLogout())
        dispatch(clearAdminData())
    }

    return (

            <Stack
                width={w}
                height={"100%"}
                bgcolor={"#1b1b1b"}
                color={"white"}
                padding={"3rem"}
                direction={"column"}
                spacing={"2rem"}
                >
                    
                    <Typography
                        variant='h5'
                        textAlign={"center"}
                    >
                        CHATTALK
                    </Typography>

                    <Stack
                        spacing={"1rem"}
                    >
                        {
                            adminTabs.map((data,index)=>(
                                <LinkStyle 
                                    to={data.path} 
                                    key={index} 
                                    sx={{
                                        position:"relative",
                                        padding:"1rem",
                                        color:"white",
                                        "&:hover":{
                                            backgroundColor:" rgba(255,255,255,0.1)",
                                        } ,
                                        backgroundColor:location.pathname === data.path ? "rgba(255,255,255,0.1)" : "unset",
                                    }}
                                    >
                                        <Stack 
                                            direction={"row"} 
                                            alignItems={"center"} 
                                            spacing={"1rem"}
                                        >
                                            {
                                                data.icon
                                            }
                                            <Typography variant='body1'>{data.name}</Typography>

                                        </Stack>
                                        
                                </LinkStyle>
                            ))
                        }

                                <LinkStyle 
                                    sx={{
                                        position:"relative",
                                        padding:"1rem",
                                        color:"white",
                                        "&:hover":{
                                            backgroundColor:" #1b1b1b",
                                        } ,
                                        textAlign:"center",
                                        width:"100%",
                                        
                                    }}
                                    onClick={logoutHandler}
                                    >
                                        <Stack 
                                            direction={"row"} 
                                            alignItems={"center"} 
                                            spacing={"1rem"}
                                        >
                                            <ExitToAppIcon/>
                                            <Typography variant='body1'>Logout</Typography>

                                        </Stack>
                                        
                                </LinkStyle>

                    </Stack>
            </Stack>
   
    )
}

export default AdminLayout