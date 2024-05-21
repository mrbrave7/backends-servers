import {Post} from "../models/postModel.js"
import asynchandler from "../utilities/asyncHandler.js";
import errorHandler from "../utilities/errorHandler.js";
import responseHandler from "../utilities/responseHandler.js";

const createPost = asynchandler(async(req,res) => {
    try {
        const {title,content,user} = req.body;
        if ([title,content,user].some(field => field && field.trim() === "")) {
            throw new errorHandler(400,"All Details Are Required")
        }
        const newpost = await Post.create({
            title,
            content,
        })
        if(!newpost){
            throw new errorHandler(408,"Something Went WErong While Creating Post")
        }
        res.status(200).json(newpost)
    } catch (error) {
        throw new errorHandler(500,"Cant Perform",error)
    }
})
const updatePost = asynchandler(async(req,res) => {
    const {title,content} = req.body;
    if([title,content].some(field => !field && field.trim() ===" ")){
        throw new errorHandler(408,"All Fields Are Required")
    }
    
})
const deletePost = asynchandler(async(req,res) => {
    try {
        const postId = req.param;
        if(!postId) {
            throw new errorHandler(408,"Can't Get PostID")
        }
        const deletedPost = await Post.deleteOne({postId})
        
        if(!deletePost) {
            throw new errorHandler(400,"Failed To Delete Post")
        }
        res.status(200).json(
            new responseHandler(201,"Successfully Deleted The Post",deletePost)
        )
    } catch (error) {
        throw new errorHandler(500,"Cant Perform",error)
    }
})
export {
    createPost,
    deletePost,
    updatePost
}