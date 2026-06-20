import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: [true, 'Actor name is required'],
            trim: true
        },
        bio: {
            type: String,
            default: ''
        },
        photoUrl: {
            type: String,
            default: ''
        },
        followerCount: {
            type: Number,
            default: 0
        }
    }
);

const Actor = mongoose.model("Actor", actorSchema);
export default Actor;