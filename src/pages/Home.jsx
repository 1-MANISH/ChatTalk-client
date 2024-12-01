import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import { grayColor } from '../constants/color.js'

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"} >
      <Typography
      variant="h5"
      textAlign="center"
      padding={"1rem"}
    >
      Select a Friend to start chat
    </Typography>
    </Box>
  )
}

export default AppLayout()(Home)