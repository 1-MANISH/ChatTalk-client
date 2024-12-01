import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../constants/config";


const adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async (secretKey)=>{
        try {
            const config = {
                withCredentials:true,
                headers: {
                    "Content-Type":"application/json"
                }
            }

            const {data} = await axios.post(`${serverUrl}/api/v1/admin/verify`,
                {secretKey},
                config
            )
           
            return data.message

        } catch (error) {
            error?.response?.data?.message   
        }
    }
)

const verifyAdmin = createAsyncThunk(
    "auth/verifyAdmin",
    async ()=>{
        try {
            const config = {
                withCredentials:true,
                headers: {
                    "Content-Type":"application/json"
                }
            }
            const {data} = await axios.get(`${serverUrl}/api/v1/admin/`,config)
            return data.admin
        } catch (error) {
            error?.response?.data?.message   
        }
    }
)

const adminLogout = createAsyncThunk(
    "auth/adminLogout",
    async ()=>{
        try {
            const config = {
                withCredentials:true,
                headers: {
                    "Content-Type":"application/json"
                }
            }
            const {data} = await axios.get(`${serverUrl}/api/v1/admin/logout`,config)
            return data.message
        } catch (error) {
            error?.response?.data?.message   
        }
    }
)



export {
    adminLogin,
    verifyAdmin,
    adminLogout,
    
}