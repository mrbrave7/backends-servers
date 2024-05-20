import mongoose from "mongoose"
import { dbName } from "../constants.js"

const database = async () => {
    try {
        const instance = await mongoose.connect(`${process.env.dbUrl}/${dbName}`)
        console.log(`MongoDB Successfully Connected At ${instance.connection.host}`)
    } catch (error) {
        console.log("Failed To Connect Database :",error)
    }
}

export default database