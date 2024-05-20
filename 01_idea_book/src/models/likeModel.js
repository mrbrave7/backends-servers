import mongoose, { Schema } from "mongoose";

const likesSchema = new Schema({
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }
},{timestamps:true})

export const Like = mongoose.model("Like",likesSchema)