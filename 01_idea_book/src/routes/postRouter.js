import { Router } from "express";
import { createPost } from "../controllers/postControllers.js";

const postRoute = Router()

postRoute.post("/post",createPost)

export default postRoute;