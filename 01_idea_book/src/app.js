import express from "express"
import globalError from "./middleware/globalError.js"
import userRoute from "./routes/userRoute.js"
import postRouter from "./routes/postRouter.js"

const app = express()

app.use(express.json({
    limit:"16kb"
}))

app.use("/api/v1/users",userRoute)
app.use("/api/v1/posts",postRouter)
app.use(globalError)

export default app