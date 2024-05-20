import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const friendSchema = new Schema({
    friend:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    friendOf:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
friendSchema.pluggin(mongooseAggregatePaginate)
export const Friend = mongoose.model("Friend",friendSchema)