import express from "express";
// import { Socket } from "node:dgram";
import {createServer} from "node:http"
import { Server } from "socket.io";

const app = express()

const server = createServer(app)
const io = new Server(server)
io.on('connection' ,(Socket) => {
    console.log('A User Connected')
    io.on('disconnected',() => {
        console.log("Disconnected")
    })
})
export default server