import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'book',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted', 'rejected','returned'],
        default:'pending'
    }
},{timestamps:true});
export const Purchased  = mongoose.model("Application", applicationSchema);