import express from "express";
import { connectDb } from "./lib/connectDb.js";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./router/auth.route.js"
import adminRoute from "./router/admin.route.js"
import {app,server} from "./lib/socket.js"
import fileUpload from "express-fileupload";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    credentials:true
}))
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
app.use(fileUpload({useTempFiles:true}))

app.use("/api/auth",authRoute);
app.use("/api/admin",adminRoute);


server.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
    connectDb();
})