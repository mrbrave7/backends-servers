import { Schema } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    liveSiteUrl: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    githubLink: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    projectCategory: {
        type: String,
        enum: ['FrontEnd', 'Backend', 'React', 'Figma', 'Other'],
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default projectSchema;
