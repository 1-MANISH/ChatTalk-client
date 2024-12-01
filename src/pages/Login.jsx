import React, { useState } from 'react'
import {
    Avatar, 
    Button, 
    Container, 
    IconButton, 
    Paper, 
    Stack, 
    TextField, 
    Typography
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {useFileHandler, useInputValidation} from "6pp"
import { userNameValidator } from '../utils/validators';
import { bgGradient } from '../constants/color.js';
import axios from 'axios';
import { serverUrl } from '../constants/config.js';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth.js';
import toast from 'react-hot-toast';

const Login = () => {

  const dispatch = useDispatch()


  const [isLogin,setIsLogin] = useState(true)
  const [isLoading,setIsLoading] = useState(false)

  const name = useInputValidation("")
  const bio = useInputValidation("")
  const username = useInputValidation("",userNameValidator)
  const password = useInputValidation("")  //useStrongPassword()
  const avatar = useFileHandler("single")

  const toggleLogin = () => {
    setIsLogin((prev)=>!prev)
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...")
    try {
        
        setIsLoading(true)
        const config = {
            headers: {
                "Content-Type":"application/json"
            },
            withCredentials:true
        }
    
        const {data}  = await axios.post(`${serverUrl}/api/v1/user/login`,{
            username:username.value,
            password:password.value
        },
        config
        )
        dispatch(userExists(data.user)) 
        toast.success(data?.message,{id:toastId})
        setIsLoading(false)
        
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
    }finally{
        setIsLoading(false)
    }
    
  }
  const registerHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Registering into application...")
    try {

        setIsLoading(true)

        const formData = new FormData()

        formData.append("username",username.value)
        formData.append("name",name.value)
        formData.append("bio",bio.value)
        formData.append("password",password.value)
        formData.append("avatar",avatar.file)

        const config = {
            headers: {
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        }


        const {data}  = await axios.post(`${serverUrl}/api/v1/user/new`,
            formData,
            config
        )
        dispatch(userExists(data.user))
        toast.success(data?.message,{id:toastId})
        setIsLoading(false)
              
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
    }finally{
        setIsLoading(false)
    }
    
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

                    {
                        isLogin ?
                        (
                            <>
                            
                                <Typography variant='h5'>Login</Typography>

                                <form style={{
                                    width:"100%",
                                    marginTop:"1rem"
                                    }} 
                                    onSubmit={loginHandler}
                                >
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        required
                                        value={username.value}
                                        onChange={username.changeHandler}
                                    />
                                    {
                                        username.error && 
                                        (
                                            <Typography
                                                color="error"
                                                variant='caption'
                                            >
                                                {username.error}
                                            </Typography>
                                        )
                                    }
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        margin="normal"
                                        type="password"
                                        fullWidth
                                        required
                                        value={password.value}
                                        onChange={password.changeHandler}
                                    />
                                    {
                                        password.error && 
                                        (
                                            <Typography
                                                color="error"
                                                variant='caption'
                                            >
                                                {password.error}
                                            </Typography>
                                        )
                                    }
                                <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{marginTop:"1rem"}}
                                        disabled={isLoading}
                                    >
                                        Login
                                    </Button>

                                    <Typography 
                                        textAlign={"center"} 
                                        mt={"1rem"}
                                    >
                                        OR
                                    </Typography>

                                    <Button
                                        sx={{marginTop:"1rem"}}
                                        variant="text"
                                        fullWidth
                                        onClick={toggleLogin}
                                    >
                                        Register Instead
                                    </Button>

                                </form>
                            </>
                        ):
                        (
                            <>
                                <Typography variant='h5'>Register</Typography>

                                    <form style={{
                                        width:"100%",
                                        marginTop:"1rem"
                                        }} 
                                        onSubmit={registerHandler}
                                    >

                                        <Stack
                                            position={"relative"}
                                            width={"10rem"}
                                            margin={"auto"}

                                        >

                                            <Avatar
                                                sx={{
                                                width:"10rem",
                                                height:"10rem" ,
                                                objectFit:"contain"
                                                }}
                                                src={avatar.preview}
                                            />

                                            <IconButton
                                                sx={{
                                                    position:"absolute",
                                                    bottom:20,
                                                    right:0,
                                                    color:"white",
                                                    bgcolor:"rgba(0,0,0,0.5)",
                                                    ":hover":{
                                                        bgcolor:"rgba(0,0,0,0.8)"
                                                    }
                                                }}
                                                component={"label"}
                                            >

                                                <>
                                                    <CameraAltIcon />
                                                    <VisuallyHiddenInput 
                                                        type='file'
                                                        onChange={avatar.changeHandler}
                                                    />
                                                </>
                                            </IconButton>

                                            {
                                                avatar.error && 
                                                (
                                                    <Typography
                                                        color="error"
                                                        variant='caption'
                                                        textAlign={"center"}
                                                        mt={"1rem"}
                                                    >
                                                        {avatar.error}
                                                    </Typography>
                                                )
                                            }


                                        </Stack>

                                        <TextField
                                            label="Name"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            required
                                            value={name.value}
                                            onChange={name.changeHandler}
                                        />
                                        <TextField
                                            label="Username"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            required
                                            value={username.value}
                                            onChange={username.changeHandler}
                                        />
                                        {
                                            username.error && 
                                            (
                                                <Typography
                                                    color="error"
                                                    variant='caption'
                                                >
                                                    {username.error}
                                                </Typography>
                                            )
                                        }
                                        <TextField
                                            label="Bio"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            required
                                            value={bio.value}
                                            onChange={bio.changeHandler}
                                        />
                                        <TextField
                                            label="Password"
                                            variant="outlined"
                                            margin="normal"
                                            type="password"
                                            fullWidth
                                            required
                                            value={password.value}
                                            onChange={password.changeHandler}
                                        />
                                        {
                                            password.error && 
                                            (
                                                <Typography
                                                    color="error"
                                                    variant='caption'
                                                >
                                                    {password.error}
                                                </Typography>
                                            )
                                        }
                                    <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{marginTop:"1rem"}}
                                            disabled={isLoading}
                                        >
                                            Register
                                        </Button>

                                        <Typography 
                                            textAlign={"center"} 
                                            mt={"1rem"}
                                        >
                                            OR
                                        </Typography>

                                        <Button
                                            sx={{marginTop:"1rem"}}
                                            variant="text"
                                            fullWidth
                                            onClick={toggleLogin}
                                        >
                                            Login Instead
                                        </Button>

                                    </form>
                            
                            </>
                        )
                    }

                </Paper>
        </Container>
    </div>
  )
}

export default Login