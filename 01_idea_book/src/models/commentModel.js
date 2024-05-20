import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema ({
    postId:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    content:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    commentedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Comment = mongoose.model("Comment",commentSchema)