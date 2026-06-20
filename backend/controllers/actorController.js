import asyncHandler from 'express-async-handler';
import Actor from '../models/Actor.js';

export const creaateActor = asyncHandler(async (req, res) => {

    const { name, bio, photoUrl } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Name is required");
    }

    const actor = await Actor.create({
        name,
        bio,
        photoUrl,
        followerCount: 0
    });

    await actor.save();
    res.status(201).json({
        message: "Actor created successfully",
        actor: actor
    });
});