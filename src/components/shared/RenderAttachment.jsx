import React from 'react'
import { transformImage } from '../../lib/feature'
import {FileOpen as FileOpenIcon} from '@mui/icons-material'

const RenderAttachment = ({file,url="",w="200px",h="150px"}) => {

    switch(file){
        
        case "video":
            return <video 
                        src={url} 
                        controls 
                        preload='none'
                        width={w}

                    />

        case "audio":
            return <audio 
                        src={url} 
                        controls 
                        preload='none'
                        width={w}
                    />
        case "image":
            return <img 
                        src={transformImage(url,200)} 
                        alt={"Attachment image"}
                        width={w}
                        height={h}
                        style={{
                            objectFit:"contain"
                        }}
                    />
        default:
            return <FileOpenIcon/>
    }
 
}

export default RenderAttachment