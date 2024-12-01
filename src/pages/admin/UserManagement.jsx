import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Skeleton } from '@mui/material'
import { transformImage } from '../../lib/feature'
import { useErrors } from '../../hooks/hook'
import { useGetAllUsersForAdminQuery } from '../../redux/api/api'


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
        <Avatar src={params.row.avatar} alt={params.row.name} />
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
    field: 'username',
    headerName: 'Username',
    width: 200,
    headerClassName: 'table-header',
  },
  {
    field: 'friends',
    headerName: 'Friends',
    width: 150,
    headerClassName: 'table-header',
  },
  {
    field: 'groups',
    headerName: 'Groups',
    width: 150,
    headerClassName: 'table-header',
  },
 
]



const UserManagement = () => {

  const {data,isLoading,error} =  useGetAllUsersForAdminQuery()
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
      setRaws(data?.users?.map((user,index)=>{
        return {...user,id:user._id,avatar:transformImage(user.avatar,50)}
      }))
    }
  },[data])

  return (

    <AdminLayout>
      {
        isLoading ? (
          <Skeleton variant="rectangular" height={"100vh"} />
        ) :(
          <Table 
            heading={"All Users"}
            rows={rows}
            columns={columns}

          />

        )
      }
      
    </AdminLayout>
  )
}

export default UserManagement