import { User } from "../models/userModel.js";
import { AppError, BadRequestError } from "../utilities/errorHandler.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_default_secret_key'; 

const registerUser = async (req, res, next) => {
    try {
        const { userName, email, password, fullName, avatar } = req.body;

        // Validate input
        if ([userName, email, password, fullName, avatar].some(field => !field || field.trim() === "")) {
            return next(new BadRequestError("All credentials are required"));
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new BadRequestError("User already exists"));
        }

        // Create the new user
        const newUser = await User.create({ userName, email, password, fullName, avatar });

        // Find the created user, excluding the password field
        const createdUser = await User.findById(newUser._id).select('-password');
        if (!createdUser) {
            return next(new AppError("Failed to create user", 500));
        }

        // Respond with success
        res.status(201).json({
            success: true,
            message: "User created successfully",
            createdUser
        });
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            return next(new BadRequestError("Duplicate field value: Please use another value"));
        }
        next(new AppError(err.message, 500));
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return next(new BadRequestError("Cannot find user"));
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return next(new AppError("Password doesn't match", 401));
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Return a response indicating successful login
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

const getUser = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const existingUser = await User.findById(userId).select('-password -token');
        if (!existingUser) {
            return next(new BadRequestError("User not found"));
        }
        return res.status(200).json({
            success: true,
            message: 'Here is your user',
            existingUser
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

export { loginUser, registerUser, getUser };
