import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { fileFormat, transformImage } from '../../lib/feature'
import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material'
import moment from 'moment'
import RenderAttachment from '../../components/shared/RenderAttachment'
import { useGetAllMessagesForAdminQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hook'


const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'attachments',
    headerName: 'Attachments',
    headerClassName: 'table-header',
    width: 400,
    renderCell: (params) => { 

      const {attachments} = params.row
      
      return (
        <Stack direction={"row"} spacing={"1rem"} alignItems={'center'} padding={"1rem"}>
         {
          attachments.length > 0 ? (

           attachments.map((data,index)=>{

            const url = data
            const file = fileFormat(url)

              return (
                <Box key={index}>
                  <a 
                  href={url} 
                  download
                  target="_blank"
                  style={{
                    color:"black",
                  }}
               
                  >
                   {<RenderAttachment file={file} url={url} w={"80px"} h={"80px"} />}
                  </a>
                </Box>
              ) 
            })
          ):(
            <span> No Attachements</span>
          )
         }
         </Stack>
      )
    }
  },
  {
    field: 'content',
    headerName: 'Content',
    width: 400,
    headerClassName: 'table-header',
  },
  {
    field: 'sender',
    headerName: 'Sent By',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => { 
      return (
        <Stack direction={"row"} spacing={"1rem"} alignItems={'center'}>
          <Avatar src={params.row?.sender?.avatar} alt={params.row?.sender?.name} />
          <span>{params.row?.sender?.name}</span>
        </Stack>
      ) 
    }
  },
  {
    field: 'chat',
    headerName: 'Chat',
    width: 220,
    headerClassName: 'table-header',
  },
  {
    field: 'groupChat',
    headerName: 'Group Chat',
    width: 100,
    headerClassName: 'table-header',
  },
  {
    field: 'createdAt',
    headerName: 'Time',
    width: 250,
    headerClassName: 'table-header',
    
  },
 
]


const MessageManagement = () => {

  const {isLoading,data,error} = useGetAllMessagesForAdminQuery()


  // error handling
  useErrors([
    {
      isError:error,
      error:error
    }
  ])
  const [rows,setRaws] = useState([])


  useEffect(()=>{
     if(data){
      setRaws(data?.messages?.map((message,index)=>{
        return {
          ...message,
          id:message._id,
          attachments:message.attachments.map((data)=>{
            return transformImage(data.url,50)
          }),
          sender:{
            avatar:transformImage(message.sender.avatar,50),
            name:message.sender.name
          },
          createdAt:moment(message.createdAt).format("MMMM Do YYYY"),
        }
      }))
     }
  },[data])
  return (
    <AdminLayout>

      {
        isLoading ? (
          <Skeleton variant='rectangular' height={"100vh"} />
        ):(
          <Table 
            heading={"All Messages"}
            rows={rows}
            columns={columns}
            rowHeight={150}

          />
        )
      }
      
    </AdminLayout>
  )
}

export default MessageManagement