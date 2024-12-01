import { Button, Dialog, DialogActions, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserItem from '../shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc.js'
import { useAsyncMutation, useErrors } from '../../hooks/hook.jsx'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api.js'

const AddMemberDialog = ({chatId}) => {

    const dispatch = useDispatch()

    const {isAddMember} = useSelector((store)=>store.miscReducer)

    const {isError,error,isLoading,data} = useAvailableFriendsQuery()
    const [addGroupMembers,isLoadingAddGroupMembers] = useAsyncMutation(useAddGroupMembersMutation)

    const [selectedMembers,setSelectedMembers] = useState([])

  
    const selectMemberHandler = (id) => {

        setSelectedMembers((prev)=>{
    
          if(prev.includes(id)){
            return prev.filter((member)=>member !== id)
          }else{
            return [...prev,id]
          }
          
        })
        
      }

    const addMemberSubmitHandler = async() => {
        await addGroupMembers("Adding members...",{chatId,members:selectedMembers})
        closeHandler()
    }

    const closeHandler = () => {
        dispatch(setIsAddMember(false))
        setSelectedMembers([])
        setMembers([])
    }


    // error handlers
    const errors = [{
      isError:isError,
      error:error
    }]

    useErrors(errors)

  return (
     <Dialog 
        open={isAddMember}
        onClose={closeHandler}
     >
        <Stack
            p={"2rem"}
            width={"22rem"}
            spacing={"2rem"}
        
        >

            <DialogTitle variant='h5' textAlign={"center"}>Add Members</DialogTitle>

            <Stack
                spacing={"1rem"}
                sx={{
                    height:"25rem",
                    overflowY:"scroll"
                }}
            >

                {
                   isLoading ? (
                    <Skeleton />
                   ) : (
                    data?.friends?.length > 0 ? (
                        data?.friends?.map((user,index)=>(
                            <UserItem 
                                key={index} 
                                user={user} 
                                handler={selectMemberHandler}
                                isAdded={selectedMembers.includes(user._id)}
                            />
                        ))
                    )
                    :(
                        <Typography variant='h6' textAlign={"center"}>No Friends</Typography>
                    )
                   )  
                }

            </Stack>

            <DialogActions >

                <Button 
                    variant='outlined'
                    color='error'
                    onClick={closeHandler}
                > 
                    Cancel 
                </Button>

                <Button 
                    variant='contained'
                    disabled={isLoadingAddGroupMembers}
                    onClick={addMemberSubmitHandler}
                > 
                    Add 
                </Button>
                

            </DialogActions>

        </Stack>

     </Dialog>
  )
}

export default AddMemberDialog