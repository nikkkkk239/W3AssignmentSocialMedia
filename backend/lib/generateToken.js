import jwt from "jsonwebtoken";

export const generateToken = (res , userId)=>{
    try {
        const encoded = jwt.sign({userId} , process.env.PRIVATE_KEY,{
            expiresIn:"15d",
        });
        res.cookie("token",encoded , {
            maxAge:15*24*60*60*1000,
            sameSite:"strict",
            httpOnly:true,
        })
    } catch (error) {
        console.log("Error in generateToken : ",error)
    }
}