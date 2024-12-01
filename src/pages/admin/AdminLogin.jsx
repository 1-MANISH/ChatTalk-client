import React, { useEffect, useState } from 'react'
import { 
    Button, 
    Container, 
    Paper, 
    TextField, 
    Typography
} from '@mui/material'

import { bgGradient } from '../../constants/color';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, verifyAdmin } from '../../redux/thunks/admin';



const AdminLogin = () => {

    const dispatch = useDispatch()

    const {isAdmin} = useSelector((store)=>store.authReducer)


    const secretKey = useInputValidation("")

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(adminLogin(secretKey.value))
        secretKey.value = ""
        
    }


    useEffect(()=>{
        dispatch(verifyAdmin())
    },[dispatch])

    if(isAdmin){
        return <Navigate to="/admin/dashboard" />
    }
  return (
    <div
    style={{
        backgroundImage:bgGradient,
    }}
    >
        <Container 
            component={"main"} 
            maxWidth="xs"
            sx={{
                height:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}
            >
                <Paper 
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >


                            
                                <Typography variant='h5'>Admin Login</Typography>

                                <form style={{
                                    width:"100%",
                                    marginTop:"1rem"
                                    }} 
                                    onSubmit={submitHandler}
                                >
                                    
                                    <TextField
                                        label="Secret Key"
                                        variant="outlined"
                                        margin="normal"
                                        type="password"
                                        fullWidth
                                        required
                                        value={secretKey.value}
                                        onChange={secretKey.changeHandler}
                                    />

                                <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{marginTop:"1rem"}}
                                       
                                    >
                                        Login
                                    </Button>

                                   

                                </form>
             

                </Paper>
        </Container>
    </div>
  )
}

export default AdminLogin