import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
import { transformImage } from '../../lib/feature'

// To do transform to functional component
const AvatarCard = ({avatar=[],max=4}) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
        <AvatarGroup 
            max={max}
            sx={{
                position:"relative"
            }} 
        >
           <Box width={"5rem"} height={"3rem"}>
            {
                avatar.map((data,index)=>(
                    <Avatar
                        key={index}
                        src={transformImage(data)}
                        alt={`Avatar ${index+1}`}
                        sx={{
                            width:"3rem",
                            height:"3rem",
                            position:"absolute",
                            left:{
                                xs:`${0.5 + index}rem`,
                                sm:`${index}rem`

                            }
                           
                        }}
                    />
                ))
            }
           </Box>

        </AvatarGroup>
    </Stack>
  )
}

export default AvatarCard