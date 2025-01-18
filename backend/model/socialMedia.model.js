import mongoose, { mongo } from "mongoose";

const mediaDetailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    handle:{
        type:String,
        required:true,
    },
    imageUrls: { type: [String], required: true }
})
const MediaDetails = mongoose.model("mediadetails",mediaDetailSchema);
export default MediaDetails;