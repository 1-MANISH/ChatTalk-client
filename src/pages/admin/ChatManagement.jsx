import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Skeleton, Stack } from '@mui/material'
import { transformImage } from '../../lib/feature'
import AvatarCard from '../../components/shared/AvatarCard'
import { useGetAllChatsForAdminQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hook'


const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => { 
      return (
        <AvatarCard avatar={params.row.avatar}  />
      ) 
    }
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'groupChat',
    headerName: 'Group',
    width: 100,
    headerClassName: 'table-header',
  },
  {
    field: 'totalMembers',
    headerName: 'Total Members',
    width: 120,
    headerClassName: 'table-header',
  },
  {
    field: 'members',
    headerName: 'Members',
    width: 350,
    headerClassName: 'table-header',
    renderCell: (params) => {

      return (
        <AvatarCard avatar={params.row.members} max={100} />
      )

    }
  }, 
  {
    field: 'totalMessages',
    headerName: 'Total Messages',
    width: 120,
    headerClassName: 'table-header',
  },
  {
    field: 'creator',
    headerName: 'Created By',
    width: 250,
    headerClassName: 'table-header',
    renderCell: (params) => {

      return (
        <Stack direction={"row"} spacing={"1rem"} alignItems={'center'}>
          <Avatar src={params.row.creator.avatar} alt={params.row.creator.name} />
          <span>{params.row.creator.name}</span>
        </Stack>
      )
    }
  },
 
]

  

const ChatManagement = () => {

  const {isLoading,data,error} = useGetAllChatsForAdminQuery()

  useErrors([{isError:error,error:error}])

  const [rows,setRaws] = useState([])



  useEffect(()=>{
    if(data){
      setRaws(data?.chats?.map((chat,index)=>{
        return {
          ...chat,
          id:chat._id,
          avatar:chat.avatar.map((data)=>{return transformImage(data,50)}),
          creator:{
            ...chat.creator,
            avatar:transformImage(chat.creator.avatar,50)
          },
          members:chat.members.map((data)=>{return transformImage(data.avatar,50)}),
        }
      }))
    }
  },[data])

  return (
    <AdminLayout>

      {
        isLoading ?(
          <Skeleton variant="rectangular" height={"100vh"} />
        ):(
          <Table 
          heading={"All Chats"}
          rows={rows}
          columns={columns}
        />
        )
      }

    </AdminLayout>
  )
}


export default ChatManagement