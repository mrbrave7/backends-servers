import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.cloudName,
    api_key:process.env.apiKey,
    api_secret:process.env.apiSecret
})

const fileUploadToCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath){
            throw new Error("Local File Path Not Found")
        }
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        console.log("File Successfully Uploaded To :",response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.error("Failed To Upload The File On Cloudinary")
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
    }
}

export default fileUploadToCloudinary