import moment from "moment"

const fileFormat = (url="") => {
    const fileExtension = url.split('.').pop()
    if(fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg"){
        return "video"
    }
    if(fileExtension === "mp3" || fileExtension === "wev" ){
        return "audio"
    }
    if(fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif"){
        return "image"
    }

    return "file"
}

// dpr_auto/w_200
const transformImage = (url="",width=100) => {
    //https://res.cloudinary.com/dhetjuxlt/image/upload/dpr_auto/w_200/v1731948144/ChatTalk/b5e85889-6458-4b3e-aa32-637b49d4fa61.jpg
    const newUrl = url.replace("/upload/",`/upload/dpr_auto/w_${width}/`)
    return newUrl
}

const getLast7Days = () => {
    const currentDate = moment()
    const last7Days = []
    for(let i=0;i<7;i++){
        const dayDate = currentDate.clone().subtract(i,"days").format("dddd")
        last7Days.unshift(dayDate)
    }
    return last7Days
}

const getOrSaveFromStorage = ({key,value,get}) => {
    if(get){
        return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)):null
    }else{
        localStorage.setItem(key,JSON.stringify(value))
    }
}

export {
    fileFormat,
    transformImage,
    getLast7Days,
    getOrSaveFromStorage
} 