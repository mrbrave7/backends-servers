import mongoose, { Schema, } from "mongoose";
const postSchema = new Schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
    postContent:{
        type:String,
        require:true,
        trim:true
    },
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    likes:{
        type:Number,
        default:0,
    }
},{timestamps:true})
export const Post = mongoose.model("Post",postSchema)