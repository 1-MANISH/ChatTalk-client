

import { createContext, useContext, useMemo } from "react"
import {io} from "socket.io-client"
import { serverUrl } from "./constants/config"

const SocketContext = createContext()

const getSocket = () => useContext(SocketContext)

const SocketProvider = ({children}) => {

    const socket = useMemo(()=>{
        return io(serverUrl,{
            withCredentials:true
        })
    },[]) // no render - one time saved

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {
    SocketProvider,
    getSocket
}