export const AdminOnlyRoute = async(req,res,next)=>{
    try {
        if(!req.user){
            return res.status(401).json({message : "Unauthroized user."})
        }
        if(req.user.role != "admin"){
            return res.status(401).json({message : "Unauthroized user."})
        }
        next();
    } catch (error) {
        console.log("Error in AdminOnlyRoute : ",error);
        return res.status(500).json({message : "Internal server error."})
    }
}