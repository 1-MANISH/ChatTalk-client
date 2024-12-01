import React ,{lazy, Suspense, useEffect} from 'react' 
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import NotFound from './pages/NotFound'
import { LayoutLoader } from './components/layout/Loaders'
import axios from 'axios'
import { serverUrl } from './constants/config'
import { useDispatch, useSelector } from 'react-redux'
import { userExists, userNotExists } from './redux/reducers/auth'
import {Toaster} from 'react-hot-toast'
import { SocketProvider } from './socket'

// dynamic import whats need
const Home = lazy(()=>import("./pages/Home"))
const Login = lazy(()=>import("./pages/Login"))
const Chat = lazy(()=>import("./pages/Chat"))
const Groups = lazy(()=>import("./pages/Groups"))

const AdminLogin = lazy(()=>import("./pages/admin/AdminLogin"))
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"))
const MessageManagement = lazy(()=>import("./pages/admin/MessageManagement"))
const UserManagement = lazy(()=>import("./pages/admin/UserManagement"))
const ChatManagement = lazy(()=>import("./pages/admin/ChatManagement"))



const App = () => {

  const dispatch = useDispatch()
  const {user,loader,isAdmin} = useSelector((store)=>store.authReducer)

  useEffect(()=>{

        axios.get(`${serverUrl}/api/v1/user/me`,{withCredentials:true}).then((res)=>{
          dispatch(userExists(res.data.user))
        }).catch((error)=>{
            dispatch(userNotExists())
            // console.log("error",error.response.data.message);
        })
      
  },[dispatch])

  return loader ? (
    <LayoutLoader/>
  ) : (
    <BrowserRouter>

      <Suspense fallback={<LayoutLoader/>}>
    
        <Routes>

          <Route element={
            <SocketProvider>
                <ProtectRoute user={user}/>
            </SocketProvider>}
          >
            <Route path="/" element={<Home/>}/>
            <Route path="/chat/:chatId" element={<Chat/>}/>
            <Route path="/groups" element={<Groups/>}/>
          </Route>

          
          <Route 
            path="/login" 
            element={
              <ProtectRoute user={!user} redirect='/'> 
                <Login/>
              </ProtectRoute>
            }
          />

          <Route path='/admin' element={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/users-management' element={<UserManagement/>}/>
          <Route path='/admin/chats-management' element={<ChatManagement/>}/>
          <Route path='/admin/messages-management' element={<MessageManagement/>}/>

          <Route path="*" element={<NotFound/>}/>

        </Routes>

      </Suspense>

      <Toaster 
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

    </BrowserRouter>
  )
}

export default App