import asynchandler from "../utilities/asyncHandler.js";
import errorHandler from "../utilities/errorHandler.js";
import { User } from "../models/userModel.js";
import fileUploadToCloudinary from "../utilities/fileUpload.js";

const createUser = asynchandler(async (req, res) => {
    try {
        const { userName, fullName, email, password, bio, profession, dateOfBirth } = req.body;

        if (![userName, fullName, email, password, bio, profession, dateOfBirth].every(field => field && field.trim() !== "")) {
            throw new errorHandler(400, "All fields are required");
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            throw new errorHandler(409, "User already exists");
        }

        const profileImageLocalPath = req.files?.profilePic[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;
        if (!profileImageLocalPath || !coverImageLocalPath) {
            throw new errorHandler(400, "Profile and cover images are required");
        }

        const profileImageUrl = await fileUploadToCloudinary(profileImageLocalPath);
        const coverImageUrl = await fileUploadToCloudinary(coverImageLocalPath);

        const newUser = await User.create({
            userName,
            fullName,
            email,
            password,
            bio,
            profession,
            dateOfBirth,
            profilePic:profileImageUrl.url,
            coverImage:coverImageUrl.url,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); 
        res.status(error.statusCode || 500).json({ message: error.message }); 
    }
});

export { createUser };
