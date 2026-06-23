import asyncHandler from 'express-async-handler';
import Notification from '../models/Notfication.js';

export const getNotfications = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const notification = await Notification.find({ user: userId }).populate("movie", "title posterUrl").populate("actor", "name");
    console.log(notification);


    res.status(200).json({
        message: "notifications"
    })
});