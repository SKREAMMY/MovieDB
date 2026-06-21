import asyncHandler from 'express-async-handler';

export const getNotfications = asyncHandler(async (req, res) => {
    res.status(200);
});