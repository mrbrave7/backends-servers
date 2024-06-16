import app from "./app.js";
import databaseConfig from "./database/index.js";
import dotenv from "dotenv"
dotenv.config()

databaseConfig()
.then(() => {
    app.on("error", () => {
        console.log("Failed To Listen App")
        process.exit(1)
    })
    app.listen(process.env.port || 700 ,() => {
        console.log(`App Is Successfully Listening At Port : ${process.env.port}`)
    })
})
.catch((error) => {
    throw new Error("Can't Call Database : ", error)
})