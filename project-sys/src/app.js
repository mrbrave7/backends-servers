import express from "express";
import userRouter from "./routes/userroutes.js";
import globalError from "./middleware/globalError.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.json());
app.use(cors());
app.post('/api',(req,res) => {
    // console.log(req)
    const {email,password} = req.body;
    console.log(email)
    console.log(password)

    res.send("Hello From Registr")
})
app.use("/api/users", userRouter);

app.use(globalError);

export default app;
