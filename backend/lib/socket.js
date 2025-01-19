import {Server} from "socket.io"
import http from 'http'
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    credentials:true
}))

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:[process.env.FRONTEND_URL],
        credentials:true,
    }
})
export function getReceiverSocketId (userId){
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on("connection",(socket)=>{
    console.log("User connected , ",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;
    console.log("Connected ----")
    console.log("User Id :- ",userId);
    console.log("Socket Id : ",userSocketMap[userId]);

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
    socket.on("disconnect",()=>{
        console.log("A user disconnected , ",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));

    })
})

export {io,app,server};