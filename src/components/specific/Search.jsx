import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import {useInputValidation} from "6pp"
import {Search as SearchIcon} from "@mui/icons-material"
import UserItem from '../shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc.js'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api.js'
import toast from 'react-hot-toast'
import { useAsyncMutation } from '../../hooks/hook.jsx'



const Search = () => {

  const dispatch = useDispatch()
  const {isSearch} = useSelector((store)=>store.miscReducer)
  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation)

  const search = useInputValidation("")
  const [users,setUsers] = useState([])


  const addFriendHandler =  async (id) => {
    await sendFriendRequest("Send Friend Request",{
      userId:id
    })
  }

  const searchCloseHandler =() =>{
    dispatch(setIsSearch(false))
  }

  useEffect(()=>{

    if(search.value.length === 0){
      setUsers([])
      return
    }

    const timeOutId = setTimeout(()=>{
      searchUser(search.value).then((res)=>{
        setUsers(res.data.users)
      }).catch((err)=>{
        toast.error(err?.data?.message || "Something went wrong")
      })
    },1000)

    return ()=>{
      clearTimeout(timeOutId)
    }
    
  },[search.value])

  return (
   <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
   >

      <Stack padding={"2rem"} direction={"column"} width={"25rem"}>

          <DialogTitle textAlign={"center"}>Find People</DialogTitle>
          <TextField 
            label="" 
            variant="outlined" 
            size='small'
            slotProps={{
              input: {
                startAdornment: 
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>,
              }
            }}
            value={search.value}
            onChange={search.changeHandler}
          />

          <List sx={{marginTop:"1rem"}}>

            {
              users?.map((user,index)=>(
                <UserItem 
                  key={index}
                  user={user}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              ))
            }
                
          </List>

      </Stack>

   </Dialog>
  )
}

export default Search