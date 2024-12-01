import React from 'react'
import {Error as ErrorIcon} from '@mui/icons-material'
import { Container, Stack, Typography } from '@mui/material'
import {Link} from "react-router-dom"

const NotFound = () => {
  return (
    <Container maxWidth={"lg"} sx={{height:"100vh"}}>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        width={"100%"}
        gap={"1rem"}
      >
        <ErrorIcon style={{fontSize:"5rem"}}/>
        <Typography variant="h2">404</Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <Link to="/">Go back to Home</Link>
      </Stack>

    </Container>
  )
}

export default NotFound