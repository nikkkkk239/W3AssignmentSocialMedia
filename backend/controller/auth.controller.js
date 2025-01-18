import { generateToken } from "../lib/generateToken.js";
import MediaDetails from "../model/socialMedia.model.js";
import User from "../model/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const login = async(req,res)=>{
    try {
        const {username , password} = req.body;
        if(!username || !password){
            return res.status(400).json({message : "Complete data required."});
        }
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message : "User not found."});
        }
        if(user.password != password){
            return res.status(400).json({message : "Incorrect Password."});
        }
        generateToken(res,user._id);
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in Login : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}

export const addTask = async (req, res) => {
    try {
        const { name, handle, imageUrls } = req.body;
        if (!name || !handle || !imageUrls || imageUrls.length === 0) {
            return res.status(400).json({ message: "Complete data required." });
        }

        const isPresent = await MediaDetails.findOne({ name });
        if (isPresent) {
            return res.status(400).json({ message: "User Details already exists." });
        }

        let secureUrlArray = [];

        const uploadPromises = imageUrls.map(async (base64Image, index) => {
            try {
                if (!base64Image.startsWith("data:image")) {
                    throw new Error(`Invalid base64 format for image at index ${index}`);
                }

                const uploadResult = await cloudinary.uploader.upload(base64Image, {
                    folder: "uploads",  
                    resource_type: "image", 
                });

                return uploadResult.secure_url;  
            } catch (error) {
                console.error(`Error uploading image at index ${index}:`, error);
                throw new Error("Error uploading image to Cloudinary");
            }
        });

        secureUrlArray = await Promise.all(uploadPromises);

        console.log("Secure URLs after upload:", secureUrlArray);


        const user = await MediaDetails.create({
            name,
            handle,
            imageUrls: secureUrlArray,
        });
        const admin = await User.findOne({role : "admin"});

        if(admin){
            const adminSocketId = getReceiverSocketId(admin._id);
            if(adminSocketId){
                io.to(adminSocketId).emit("newTask",user);
                console.log("Event triggered to ,",adminSocketId);
            }
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in addTask:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
export const checkAuth = async(req,res)=>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie("token" , "" , {maxAge : 0});
        return res.status(200).json({message : "Logged out successfully."})
    } catch (error) {
        console.log("Error in logout : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}