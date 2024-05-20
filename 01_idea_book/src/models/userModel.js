import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    profession:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    profilePic:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        require:true,
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)