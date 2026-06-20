import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from "../models/User.js";


// verifies the bearer token and attaches the user (without password) to the req.user

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req.headers);
    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    // decode the token and attach the user to req.user
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded ", decoded);
        req.user = await User.findById(decoded.id).select('-password');
        console.log("received user ", req.user.role);
        if (!req.user) {
            return res.status(401);
            throw new Error("User no longer exists");
        }
        next();
    } catch (err) {
        throw new Error(err.message);
    }

});