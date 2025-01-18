import MediaDetails from "../model/socialMedia.model.js";

export const getDetails = async(req,res)=>{
    try {
        const details = await MediaDetails.find({});
        return res.status(200).json(details);

    } catch (error) {
        console.log("Error in getDetails : ",error);
        return res.status(500).json({message :"Internal server error."})
    }
}