import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./reducers/auth.js"
import api from "./api/api.js"
import miscSlice from "./reducers/misc.js"
import chatSlice from "./reducers/chat.js"


const store = configureStore({
    reducer: {
        authReducer:authSlice.reducer,
        miscReducer:miscSlice.reducer,
        chatReducer:chatSlice.reducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(defaultMiddleware)=>{
        return [...defaultMiddleware(),api.middleware]
    }
})

export default store