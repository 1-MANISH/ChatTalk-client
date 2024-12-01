import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/feature";
import { NEW_MESSAGE_ALERT } from "../../constants/event";


const chatSlice = createSlice({
    name:"chat",
    initialState:{
        notificationCount:0,
        newMessagesAlert:getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true}) || [
            {
            chatId:"",
            count:0,
        }
    ],
    },
    reducers:{
        incrementNotificationCount:(state,action)=>{
            state.notificationCount += 1
        },
        resetNotificationCount:(state,action)=>{
            state.notificationCount  = 0
        },
        setNewMessagesAlert:(state,action)=>{
            
            const index = state.newMessagesAlert.findIndex(item=>item.chatId===action.payload.chatId)

            if(index !== -1){
                state.newMessagesAlert[index].count += 1
            }else{
                state.newMessagesAlert.push({
                    chatId:action.payload.chatId,
                    count:1
                })
            }

        },
        removeNewMessagesAlert:(state,action)=>{
            state.newMessagesAlert = state.newMessagesAlert.filter(item=>item.chatId !== action.payload.chatId)
        }
    }
})



export const {
    incrementNotificationCount,
    resetNotificationCount,
    setNewMessagesAlert,
    removeNewMessagesAlert
 } = chatSlice.actions

export default chatSlice