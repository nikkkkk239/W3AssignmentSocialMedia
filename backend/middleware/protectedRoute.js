import jwt from "jsonwebtoken";
import User from "../model/user.model.js";


export const protectedRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message :" Unauthroized user."})
        }
        const decoded = jwt.verify(token , process.env.PRIVATE_KEY);
        if(!decoded){
            return res.status(401).json({message :" Unauthroized user."})
        }
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({message :" Unauthroized user."})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoute : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}