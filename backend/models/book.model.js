import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    bookid:{
        type:Number,
        required:true
    },
    category:{
        type:"string",
        required:true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type:String
    },
    total:{
        type:Number,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps:true});
export const Book = mongoose.model("book", bookSchema);