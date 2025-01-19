import express from "express";
import { connectDb } from "./lib/connectDb.js";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./router/auth.route.js"
import adminRoute from "./router/admin.route.js"
import {app,server} from "./lib/socket.js"
import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'] ,
    credentials:true
}))

app.use(express.json({limit:'6mb'}));
app.use(cookieParser());
app.use(fileUpload({useTempFiles:true}))

app.use("/api/auth",authRoute);
app.use("/api/admin",adminRoute);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname , "../frontend","dist","index.html"))
    })
}


server.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
    connectDb();
})