import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        index:true,
        trim: true,
        lowercase:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    developerCategory: {
        type: String,
        enum: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Data Scientist', 'Other'],
        default: 'Other'
    }
}, { timestamps: true });

export const User = mongoose.model("User",userSchema)
