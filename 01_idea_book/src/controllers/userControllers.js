import createHttpError from "http-errors";
import asynchandler from "../utilities/asyncHandler.js";
import errorHandler from "../utilities/errorHandler.js";
import { User } from "../models/userModel.js";
import fileUploadToCloudinary from "../utilities/fileUpload.js";

const createUser = asynchandler(async (req, res) => {
    try {
        const { userName, fullName, email, password, bio, profession, dateOfBirth } = req.body;

        // Check if required fields are missing or empty
        if (![userName, fullName, email, password, bio, profession, dateOfBirth].every(field => field && field.trim() !== "")) {
            throw new errorHandler(400, "All fields are required");
        }

        // Check if user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            throw new errorHandler(409, "User already exists");
        }

        // Check if profile and cover images are provided
        const profileImageLocalPath = req.files?.profilePic[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;
        if (!profileImageLocalPath || !coverImageLocalPath) {
            throw new errorHandler(400, "Profile and cover images are required");
        }

        // Upload images to Cloudinary
        const profileImageUrl = await fileUploadToCloudinary(profileImageLocalPath);
        const coverImageUrl = await fileUploadToCloudinary(coverImageLocalPath);

        // Create user in the database
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

        res.status(201).json(newUser); // Return newly created user
    } catch (error) {
        console.error(error); // Log error
        res.status(error.statusCode || 500).json({ message: error.message }); // Return appropriate error response
    }
});

export { createUser };
