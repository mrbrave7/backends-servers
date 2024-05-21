import { Router } from "express";
import { 
    createPost,
    deletePost,
    updatePost
 } from "../controllers/postControllers.js";

const postRoute = Router()

postRoute.post("/post",createPost)
postRoute.post("/deletepost",deletePost)
postRoute.post("/deletepost",updatePost)

export default postRoute;