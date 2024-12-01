import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { lazy, Suspense, useState } from 'react'
import { orange } from '../../constants/color.js'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from "@mui/icons-material/Logout"
import NotificationsIcon from '@mui/icons-material/Notifications'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { serverUrl } from '../../constants/config.js';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth.js';
import { setIsMobileMenu, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc.js';
import { resetNotificationCount } from '../../redux/reducers/chat.js';

const SearchDialog = lazy(()=>import("../specific/Search"))
const NotificationDialog = lazy(()=>import("../specific/Notifications"))
const NewGroupDialog = lazy(()=>import("../specific/NewGroup"))

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {isSearch,isNotification,isNewGroup} = useSelector((store)=>store.miscReducer)
    const {notificationCount} = useSelector((store)=>store.chatReducer)
    
    

    const handleMobile = () => {
        dispatch(setIsMobileMenu(true))
        
    }

    const openSearch = () => {
        dispatch(setIsSearch(true))
        
    }

    const openNewGroup = () => {
        dispatch(setIsNewGroup(true))
    }

    const openNotifications = () => {
        dispatch(setIsNotification(true))  
        dispatch(resetNotificationCount())
    }

    const navigateToGroups = () => {
        navigate("/groups")
    }

    const logoutHandler   = async () => {
        console.log("logoutHandler");
        try {
            const {data} = await axios.get(`${serverUrl}/api/v1/user/logout`,{withCredentials:true})
            toast.success(data?.message)
            dispatch(userNotExists())

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
            
        }
        
    }
  return (
    <>
        <Box
            sx={{flexGrow:1}}
            height={"4rem"}
        >
            <AppBar 
                position="static" 
                sx={{
                    bgcolor:orange
                }}
            >

                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                        
                    >
                        ChatTalk
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: "block", sm: "none" },
                        }}
                    >
                        <IconButton 
                            color='inherit'
                            onClick={handleMobile}
                        >
                            <MenuIcon/>
                        </IconButton>

                    </Box>

                    <Box 
                        sx={{ flexGrow: 1 }}
                    />

                    <Box>

                        <IconBtn
                            title="Search" 
                            icon={<SearchIcon/>}
                            onClick={openSearch}
                        
                        />

                        <IconBtn
                            title="New Group" 
                            icon={<AddIcon/>}
                            onClick={openNewGroup}
                        
                        />

                        <IconBtn
                            title="Manage Groups" 
                            icon={<GroupIcon/>}
                            onClick={navigateToGroups}
                        
                        />

                        <IconBtn
                            title="Notifications" 
                            icon={<NotificationsIcon/>}
                            onClick={openNotifications}
                            value={notificationCount}
                        
                        />

                        <IconBtn
                            title="Logout" 
                            icon={<LogoutIcon/>}
                            onClick={logoutHandler}
                        
                        />
                        
                    </Box>

                </Toolbar>

            </AppBar>

        </Box>

        {
            isSearch && (
                <Suspense fallback={<Backdrop open />}>
                    <SearchDialog/>
                </Suspense>
            )
        }
        {
            isNewGroup && (
                <Suspense fallback={<Backdrop open />}>
                    <NewGroupDialog/>
                </Suspense>
            )
        }
        {
            isNotification && (
                <Suspense fallback={<Backdrop open />}>
                    <NotificationDialog/>
                </Suspense>
            )
        }


    </>
  )
}


const IconBtn = ({title,icon,onClick,value}) => {

    return ( 
        <Tooltip title={title}>
                <IconButton 
                    color='inherit'
                    onClick={onClick}
                    size='large'
                >
                    {
                        value ? (
                            <Badge
                                badgeContent={value}
                                color="secondary"
                            >
                                {icon}
                            </Badge>
                        ):(
                            <>
                                 {icon}
                            </>
                        )
                    }
                   
            </IconButton>
        </Tooltip>
    )

}

export default Header