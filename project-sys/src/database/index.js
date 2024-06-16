import mongoose from "mongoose";
import { databaseName } from "../constants.js";

async function databaseConfig() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.databaseUrl}/${databaseName}`)
        console.log("MOngoDB Connected Successfully At Host :" , connectionInstance.connection.host)
    } catch (error) {
        console.log("Failed To Connect Database",error)
    }
}
export default databaseConfig