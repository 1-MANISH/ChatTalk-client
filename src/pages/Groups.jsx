import { 
  KeyboardBackspace  as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, IconButton, Skeleton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState,useEffect, lazy, Suspense } from 'react'
import { bgGradient, matBlack } from '../constants/color.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GroupList from '../components/specific/GroupList';
import UserItem from '../components/shared/UserItem';
import {  useDeleteChatMutation, useGetChatDetailsQuery, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api.js';
import { useAsyncMutation, useErrors } from '../hooks/hook.jsx';
import {LayoutLoader} from '../components/layout/Loaders.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducers/misc.js';

const ConfirmDeleteDialog  = lazy(()=>import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(()=>import("../components/dialogs/AddMemberDialog"))


const Groups = () => {

  const searchParams= useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const chatId = searchParams[0].get("group")

  const {isAddMember} = useSelector((store)=>store.miscReducer)

  const myGroups = useMyGroupsQuery()
  const groupDetails = useGetChatDetailsQuery({chatId,populate:true},{skip:!chatId})

  const [renameGroup,isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
  const [removeGroupMember,isLoadingRemoveGroupMember] = useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteGroup,isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation)
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false)

  const [groupName,setGroupName] = useState("")
  const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("")
  const [members,setMembers ] = useState( [] )

  const errors = [{
    isError:myGroups?.isError,
    error:myGroups?.error
  },{
    isError:groupDetails?.isError,
    error:groupDetails?.error
  }
]

  // error handler
  useErrors(errors)

  // useEffect
  useEffect(() => {

    if(groupDetails?.data){
      setGroupName(groupDetails?.data?.chat?.name)
      setGroupNameUpdatedValue(groupDetails?.data?.chat?.name)
      setMembers(groupDetails?.data?.chat?.members)
    }

    return ()=>{
      setGroupName("")
      setGroupNameUpdatedValue("")
      setMembers([])
      setIsEdit(false)
      
    }

  }, [groupDetails?.data,groupName])

  const navigateBack = ()=> {
      navigate("/")
  }

  const handleMobile = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false)
  }

  const updateGroupNameHandler = async () => {
    setIsEdit(false)

    await renameGroup("Updating group name ...",{
      chatId,
      name:groupNameUpdatedValue
    })
    // setGroupName(groupNameUpdatedValue)

  }

  const openConfirmDeleteHandler = () => {
      setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }

  const deleteHandler =  async() => {
    
    await deleteGroup("Deleting group ...",chatId)

    closeConfirmDeleteHandler()

    navigate("/groups")

  }


  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }

  const removeMemberHandler = async (id) => {

    await removeGroupMember("Removing member ...",{
      chatId,
      userId:id
    })

    
  }

  const IconButtons = <>

     <Box 
        sx={{
          display: { 
            xs: "block", 
            sm: "none" ,
            position: "fixed",
            top: "2rem",
            right: "2rem",
            
          }
          
        }} 
    >

          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
     </Box>

    <Tooltip title="back">
      <IconButton
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: matBlack,
          color: "white",
          ":hover":{
            bgcolor:"rgba(0,0,0,0.6)",
            color:"white"
          }
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>

  </>

  const ButtonGroup = <Stack
    direction={{
      xs:"column-reverse",
      sm:"row"
    }}
    spacing={"1rem"}
    padding={{
      xs:"0rem",
      sm:"1rem",
      md:"1rem 4rem"
    }}
  >

    <Button
      color='error'
      size="large"
      variant='outlined' 
      startIcon={<DeleteIcon />}
      onClick={openConfirmDeleteHandler}
      disabled={isLoadingDeleteGroup}
    >
      Delete Group
    </Button>

    <Button
       variant="contained"
       size="large"
       startIcon={<AddIcon />}
       onClick={openAddMemberHandler}
    >
      Add Member 
    </Button>


  </Stack>

  const GroupName = <Stack
    direction={"row"}
    alignItems={"center"}
    justifyContent={"center"}
    spacing={"1rem"}
    padding={"3rem"}
    >

    {
      isEdit ? (
        <>
          <TextField 
            label="Group Name"
            variant="standard"
            value={groupNameUpdatedValue }
            onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupNameHandler} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      )
      :(
        <>
          <Typography variant='h4'> {groupName}</Typography>
          <IconButton onClick={()=>setIsEdit(true)} disabled={isLoadingGroupName}>
            <EditIcon />
          </IconButton>
        </>
      )
    }

  </Stack>


    useEffect(() => {

      if(chatId){
        // fetch and set - later
      
        setGroupName( `Group Name ${chatId}`)
        setGroupNameUpdatedValue( `Group Name ${chatId}`)
      }

      return () => {
        setGroupName("")
        setGroupNameUpdatedValue("")
        setIsEdit(false)
      }
      
    }, [chatId])
    

  return myGroups?.isLoading ? <LayoutLoader /> : (
    <Grid
      container
      height={"100vh"}
      width={"100%"}
    >
      <Grid
        item
        size={{
          sm: 4,
        }}
        sx={{
          display: { xs: "none", sm: "block" },
          backgroundImage: bgGradient,

        }}
      >

        <GroupList  myGroups={myGroups?.data?.groups} chatId={chatId} />

      </Grid>

      <Grid 
        item 

        size={{
          xs:12,
          sm:8,
        }} 
        sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          position:"relative",
          padding:"1rem 3rem"
        }}
      >
       {
          IconButtons
       }

       {
          groupName && <>
          
            {GroupName}

            <Typography 
              m={"2rem"}
              alignSelf={"flex-start"}
              variant='h6'
            >
              Members
            </Typography>


            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm:"1rem",
                xs:"0rem",
                md:"1rem 4rem"
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={'auto'}

            
            >

              {/* members */}

              {
               isLoadingRemoveGroupMember ? <CircularProgress /> :
                groupDetails.isLoading ? <Skeleton /> :(
                  members.map((user,index)=>{
                    return (
                      <UserItem 
                        key={user._id} 
                        user={user} 
                        isAdded
                        styling={{
                            boxShadow:"0 0 0.5rem rgba(0, 0, 0, 0.2)",
                            padding:"1rem 2rem",
                            borderRadius:"0.5rem"
                        }}
                        handler={removeMemberHandler}
                      />
                    )
                  })
                )
                
              }



            </Stack>

            {ButtonGroup}

          </>
       }

      </Grid>
      

      {/* Drawer for mobile view  */}

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        anchor="left"
        sx={{
          display: { xs: "block", sm: "none" },
          height: "100%",
          width: "50vw",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundImage: bgGradient,
            height: "100%",
          }}
        >
          <GroupList w='50vw' myGroups={myGroups?.data?.groups} chatId={chatId} />
        </Box>
      </Drawer>

      {/* Delete group dialog */}

      {
        confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open={true} />}>
            <ConfirmDeleteDialog 
            open={confirmDeleteDialog} 
            closeHandler={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
            groupName={groupName}
          />
          </Suspense>
        )
      }
      {/* Add member dialog */}
      {
        isAddMember && (
          <Suspense fallback={<Backdrop open={true} />}>
            <AddMemberDialog chatId={chatId}/>
          </Suspense>
        )
      }

    </Grid>
  )
}

export default Groups