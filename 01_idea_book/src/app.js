import express from "express"
import globalError from "./middleware/globalError.js"
import userRoute from "./routes/userRoute.js"
import postRouter from "./routes/postRouter.js"
import cors from "cors"
const app = express()

app.use(cors({
    origin:process.env.corsOrigin,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use("/api/v1/users",userRoute)
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/friends",postRouter)
// app.use(globalError)

export default app