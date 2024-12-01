import { Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import NotificationItem from '../shared/NotificationItem'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc.js'
import { useAsyncMutation, useErrors } from '../../hooks/hook.jsx'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api.js'

const Notifications = () => {


  const dispatch = useDispatch()
  const {isNotification} = useSelector((store)=>store.miscReducer)

  const {isLoading,data,error,isError} = useGetNotificationsQuery()

  // some useEffect error handling
  useErrors ([{isError,error}])

  // mutation handler
  const [acceptRequest] = useAsyncMutation( useAcceptFriendRequestMutation)

  const friendRequestHandler = async ({_id,accept}) => {
     // add friend request 
 
    dispatch(setIsNotification(false))
    await acceptRequest("Accepting friend request 👊",{requestId:_id,accept})
     
  }

  const closeNotificationHandler = () => {
      dispatch(setIsNotification(false))
  }

  return (
    <Dialog
    open={isNotification}
    onClose={closeNotificationHandler}
    >

      <Stack p={{xs:"1rem",sm:"2rem"}} width={"25rem"} spacing={"1rem"} >

         <DialogTitle textAlign={"center"} variant='h4'>Notifications</DialogTitle>

          {
            isLoading ? (
              <Skeleton />
            ):(
              <>
                {
                  data?.allRequests.length > 0 ? 
                    (
                      data?.allRequests?.map((data,index)=>(
                        <NotificationItem 
                          key={index} 
                          sender={data.sender} 
                          _id={data._id} 
                          handler={friendRequestHandler}

                          />
                    ))
                    ) 
                    :
                    (
                      <Typography textAlign={"center"} color='red'>0 Notifications</Typography>
                    )
                }
              </>
            )
          }
      </Stack>

    </Dialog>
  )
}




export default Notifications