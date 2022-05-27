import express from "express";
import http from 'http'
import { Server, Socket } from "socket.io"
import cors from 'cors'

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {

        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) => {
    // console.log(`user connected ${socket.id}`)

  
    socket.on("join_room",(data)=>{
        socket.join(data)
    })
    socket.on("send_message", (data) => {
        console.log(data)
       // socket.broadcast.emit("recieved_data",data)
       socket.to(data.room).emit("recieved_data",data)
    })

})


server.listen(4000, () => {
    console.log("Server running at port number 4000")
})