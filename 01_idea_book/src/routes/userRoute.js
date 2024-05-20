import { Router } from "express";
import { createUser } from "../controllers/userControllers.js";
import { upload } from "../middleware/multer.js";

const userRoute = Router()

// userRoute.post("/register", createUser)
userRoute.route("/register").post(
    upload.fields([
        {
            name: "profilePic",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),createUser)

export default userRoute;
