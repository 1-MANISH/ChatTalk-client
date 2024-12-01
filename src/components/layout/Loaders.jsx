import { Grid2 as Grid,Skeleton, Stack } from '@mui/material'
import React from 'react'
import { BouncingSkeleton } from '../styles/StyledComponents'

export const LayoutLoader = () => {
    return (
        <Grid container  spacing={"1rem"}>

          <Grid 
            item 
            size={{sm:4,md:3}} 
            sx={{
                display: { xs: "none", sm: "block" },
            }} 
            height={"100%"} 
          >
                 <Skeleton variant="rectangular" height={"100vh"}/>
          </Grid>

          <Grid 
            item 
            size={{xs:12,sm:8,md:5,lg:6}} 
            height={"100%"}
            >

               <Stack spacing={"1rem"}>
                {
                    Array.from({length: 5}).map((_, index) => (
                        <Skeleton variant="rectangular" height={"5rem"} key={index} />
                    ))
                }
               </Stack>
                
                 
          </Grid>

          <Grid 
            item 
            size={{md:4,lg:3}} 
            height={"100%"} 
            sx={{
                display: { xs: "none", md: "block" },
                
            }}
            >
                <Skeleton variant="rectangular" height={"100vh"}/>

          </Grid>
        
        </Grid>
    )
}

export const TypingLoader = () => {
    return (
        <Stack
            spacing={"0.5rem"}
            direction={"row"}
            padding={"0.5rem"}
            justifyContent={"center"}
        >

            {
                Array.from({length: 4}).map((_, index) => (
                    <BouncingSkeleton variant='circular' width={15} height={15} style={{ animationDelay: `${((index+1)*2)/10}s`}}/>
                ))
            }
            

        </Stack>
    )
}