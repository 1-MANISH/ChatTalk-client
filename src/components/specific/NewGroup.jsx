import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData.js'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useCreateNewGroupMutation } from '../../redux/api/api.js'
import { useAsyncMutation, useErrors } from '../../hooks/hook.jsx'
import { setIsNewGroup } from '../../redux/reducers/misc.js'
import toast from 'react-hot-toast'

const NewGroup = () => {

  const dispatch = useDispatch()

  const {isNewGroup} = useSelector((store)=>store.miscReducer)


  const {isError,error,isLoading,data} = useAvailableFriendsQuery()
  const [newGroup,isLoadingNewGroup] = useAsyncMutation(useCreateNewGroupMutation)

  const [selectedMembers,setSelectedMembers] = useState([])
  const groupName = useInputValidation("")


  // error handlers
  const errors = [
    {
      isError:isError,
      error:error
    }
  ]
  useErrors(errors)

  const selectMemberHandler = async (id) => {

    setSelectedMembers((prev)=>{

      if(prev.includes(id)){
        return prev.filter((member)=>member !== id)
      }else{
        return [...prev,id]
      }
      
    })
   
  }
  
  const submitHandler = async() => {
    if(!groupName.value.trim()) 
      return toast.error("Group name is required")
    if(selectedMembers.length < 2)
      return toast.error("Group must have at least 2 members")

    // creating group

    await newGroup(
      "Creating new group...",
      {
      name:groupName.value,
      members:selectedMembers
      }
    )

    closeHandler()
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }


  return (
    <Dialog
    open={isNewGroup}
    onClose={closeHandler}
    >

      <Stack p={{xs:"1rem",sm:"3rem"}} width={"25rem"} spacing={"2rem"}>

         <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>

         <TextField
            label="Group Name"
            variant="outlined"
            size='medium'
            value={groupName.value}
            onChange={groupName.changeHandler}
         />

         <Typography variant="h6">Members</Typography>

          <Stack
            sx={{
              height:"20rem",
              overflow:"auto"
            }}
          >
            {
              isLoading ? (
                <Skeleton variant="rectangular" height={"5rem"} />
              ):
              
                (

                  data?.friends?.map((user,index)=>(
                    <UserItem 
                      key={index}
                      user={user}
                      handler={selectMemberHandler}
                      isAdded={selectedMembers.includes(user._id)}
                      
                    />
                  ))
                )
              
            }
          </Stack>

          <Stack direction={"row"} justifyContent={"space-between"} gap={"1rem"}>

             <Button 
                variant='outlined' 
                color='cancel' 
                sx={{width:"100%"}}
                size='large'
                onClick={closeHandler}
              >
                  Cancel
              </Button>
             <Button 
                variant='contained' 
                color='success' 
                sx={{width:"100%"}}
                size='large'
                onClick={submitHandler}
                disabled={isLoadingNewGroup}
              >
                  Create
              </Button>

          </Stack>
          
      </Stack>

    </Dialog>
  )
}

export default NewGroup