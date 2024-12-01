import { createSlice} from "@reduxjs/toolkit"
import { adminLogin, adminLogout, verifyAdmin } from "../thunks/admin"
import toast from "react-hot-toast"


const authSlice = createSlice({
    name: "auth",
    initialState:{
        user:null,
        isAdmin:false,
        loader:true,

    },
    reducers:{
        userExists:(state,action)=>{
            state.user = action.payload
            state.loader = false
         
        },
        userNotExists:(state,action)=>{
            state.user = null,
            state.loader = false
            
        }
    },
    extraReducers:(builder)=>{

        let toastId = "some"
        builder
        .addCase(adminLogin.pending,(state,action)=>{
            state.isAdmin = false
            toastId = toast.loading("Logging in...")
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.isAdmin = true
            toast.success(action.payload,{id:toastId})
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.isAdmin = false
            toast.error(action.error.message,{id:toastId})
        })
        .addCase(verifyAdmin.fulfilled,(state,action)=>{

            if(action.payload ){
                state.isAdmin = true
            }else{
                state.isAdmin = false
            }
           
        })
        .addCase(verifyAdmin.rejected,(state,action)=>{
            state.isAdmin = false
            state.loader = false
        })
        .addCase(adminLogout.pending,(state,action)=>{
            state.isAdmin = false
            toastId = toast.loading("Logging out...")
        })
        .addCase(adminLogout.fulfilled,(state,action)=>{
            state.isAdmin = false
            toast.success(action.payload,{id:toastId})
        })
        .addCase(adminLogout.rejected,(state,action)=>{
            state.isAdmin = true
            toast.error(action.error.message,{id:toastId})
        })
    }

})

export const {userExists,userNotExists} = authSlice.actions

export default authSlice