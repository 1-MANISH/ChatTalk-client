import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc'
import {
  Image as ImageIcon,
  AudioFile as AudioFileIcon,
  VideoFile as VideoFileIcon,
  FileUpload as FileUploadIcon
} from "@mui/icons-material"
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/api/api'

const FileMenu = ({anchorE1,chatId}) => {

  const dispatch = useDispatch()

  const imageRef = useRef(null)
  const audioRef = useRef(null)
  const videoRef = useRef(null)
  const fileRef = useRef(null)

  const {isFileMenu} = useSelector((store)=>store.miscReducer)



  const [sendAttachments] = useSendAttachmentsMutation()

  const handleFileMenuClose = () => {
    dispatch(setIsFileMenu(false))
  }

  const selectImage = () => {
    imageRef?.current?.click()
  }
  const selectAudio = () => {
    audioRef?.current?.click()
  }
  const selectVideo = () => {
    videoRef?.current?.click()
  }
  const selectFile = () => {
    fileRef?.current?.click()
  }

  const fileChangeHandler = async (e,key) => {

      const files = Array.from(e.target.files)
      
      if(files.length <= 0) {
        return
      }

      if(files.length > 5) {
        return toast.error("You can upload at most 5 files")
      }

      dispatch(setUploadingLoader(true))

      const toastId = toast.loading(`Sending ${key}...`)
      handleFileMenuClose()


       try {
          // fetching here

          const myForm = new FormData()

          myForm.append("chatId",chatId)
          files.forEach((file)=>{
              myForm.append("files",file)
          })
         
          const res = await sendAttachments(myForm)

          if(res?.data){
             toast.success(`${key} sent successfully`,{id:toastId})
          }
          else{
             toast.error(`Failed to send ${key}`,{id:toastId})
          }



       } catch (error) {
          toast.error(error || "Something went wrong",{id:toastId})
       }
       finally{
          dispatch(setUploadingLoader(false))
       }

      
  }

  return (
    <Menu 
        anchorEl={anchorE1}
        open={isFileMenu}
        onClose={handleFileMenuClose}
        sx={{

        }}
    >
        <div style={{width:"10rem"}}>
          <MenuList>

            <MenuItem onClick={selectImage}>
              <Tooltip title="Image">
                  <ImageIcon />
              </Tooltip>
              <ListItemText style={{marginLeft:"0.5rem"}}>Image</ListItemText>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/gif" 
                multiple 
                style={{display:"none"}}
                onChange={(e)=>fileChangeHandler(e,"Images")}
                ref={imageRef}
              />
            </MenuItem>
 
            <MenuItem onClick={selectAudio}>
              <Tooltip title="Audio">
                  <AudioFileIcon />
              </Tooltip>
              <ListItemText style={{marginLeft:"0.5rem"}}>Audio</ListItemText>
              <input 
                type="file" 
                accept="audio/mp3, audio/wav" 
                multiple 
                style={{display:"none"}}
                onChange={(e)=>fileChangeHandler(e,"Audios")}
                ref={audioRef}
              />
            </MenuItem>
    
            <MenuItem onClick={selectVideo}>
              <Tooltip title="Video">
                  <VideoFileIcon />
              </Tooltip>
              <ListItemText style={{marginLeft:"0.5rem"}}>Video</ListItemText>
              <input 
                type="file" 
                accept="video/mp4, video/webm, video/ogg" 
                multiple 
                style={{display:"none"}}
                onChange={(e)=>fileChangeHandler(e,"Videos")}
                ref={videoRef}
              />
            </MenuItem>
       
            <MenuItem onClick={selectFile}>
              <Tooltip title="File">
                  <FileUploadIcon />
              </Tooltip>
              <ListItemText style={{marginLeft:"0.5rem"}}>File</ListItemText>
              <input 
                type="file" 
                accept="*" 
                multiple 
                style={{display:"none"}}
                onChange={(e)=>fileChangeHandler(e,"Files")}
                ref={fileRef}
              />
            </MenuItem>

          </MenuList>

        </div>

    </Menu>
  )
}

export default FileMenu