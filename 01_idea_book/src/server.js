import app from "./app.js";
import database from "./database/index.js";
import dotenv from  "dotenv"

dotenv.config()

database()
.then(() => {
    app.on("error" , () => {
        console.log("Failed To Listen App : ",err)
    })
    app.listen(process.env.port || 5000, () => {
        console.log(`App Is SuccessFully Listening At Port ${process.env.port}`)
    })
})
.catch((err) => {
    console.log("Failed To Call Database Internal Server Error:",err)
    process.exit(1)
})