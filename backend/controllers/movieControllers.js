import asyncHandler from "express-async-handler";
import Movie from "../models/Movie.js";
import User from "../models/User.js";


export const createMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.create({
        ...req.body,
        createdBy: req.user._id
    });

    res.status(201).json(
        {
            message: "Movie created",
            movie: movie
        }
    );
});

export const watchMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error("No movie found");
    }

    if (movie.status !== "launched") {
        res.status(400);
        throw new Error("Movie is not available yet");
    }
    const userId = req.user._id.toString();

    const alreadyWatched = movie.watchedBy.some((u) => u.toString() === userId);

    if (!alreadyWatched) {
        movie.watchedBy.push(req.user._id);
        movie.watchCount += 1;
        await movie.save();

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { watchedMovies: movie._id }
        });
    }

    res.json({
        message: "Enjoy watching movie",
        watchCount: movie.watchCount
    });
});

export const reviewMovie = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
        res.status(400);
        throw new Error("Rating should be between 1 to 5");
    }

    const movie = await Movie.findById(req.params.id);

    if (!movie || movie.status === "draft") {
        res.status(400);
        throw new Error("unable to add a review");
    }

    const userId = req.user._id.toString();

    const alreadyReviewed = movie.reviews.some((u) => u.toString() === userId);

    if (!alreadyReviewed) {
        movie.reviews.push({
            _id: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment: comment || ''
        });

        movie.numReviews = movie.reviews.length;
        movie.rating = movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length;

        await movie.save();
        res.status(201).json(
            {
                message: "Review added successfully",
                rating: movie.rating
            }
        )
    } else {
        res.status(400);
        throw new Error("Movie reviewed already");
    }
});

export const getMovieById = asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    console.log("movie id is ", movieId);
    const movie = await Movie.findById(movieId);
    console.log("movie is ", movie);
    res.status(200).json({
        movie: movie
    })
});

export const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({});
    res.status(200).json({
        movies: movies
    })
});

export const updateMovie = asyncHandler(async (req, res) => {

    // status is launched only via the launch update endpoint, not a generic update
    const { status, ...update } = req.body;

    const movie = await Movie.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
    }).populate("actors", "name photoUrl");

    if (!movie) {
        res.status(400);
        throw new Error("Movie not found");
    }

    console.log("modified movie is ", movie);
    res.status(200).json({
        message: "Movie updated successfully",
        movie: movie
    });


});