import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, default: '' },
    }
)

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        genre: {
            type: String,
            required: [true, 'Genre is required'],
        },
        actors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Actor'
            }
        ],
        director: {
            type: String,
            default: ''
        },
        releaseYear: {
            type: Number
        },
        duration: {
            type: Number
        },
        language: {
            type: String,
            default: 'English'
        },
        posterUrl: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['draft', 'launched'],
            default: 'draft'
        },
        launchedAt: {
            type: Date
        },
        watchedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        watchCount: { type: Number, default: 0 },
        reviews: [reviewSchema],
        rating: { type: Number, default: 0 }, // average of reviews
        numReviews: { type: Number, default: 0 },

        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;