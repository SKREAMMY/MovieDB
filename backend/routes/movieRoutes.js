import express from "express";
import { watchMovie, reviewMovie, createMovie, getMovieById, getAllMovies, updateMovie, launchMovie } from '../controllers/movieControllers.js';


const router = express.Router();

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

router.use(protect);

router.route('/').get(getAllMovies).post(adminOnly, createMovie);

router.post("/:id/watch", watchMovie);
router.post("/:id/reviews", reviewMovie);
router.put("/update/:id", adminOnly, updateMovie);

router.get("/:id", getMovieById);

router.put("/:id/launch", adminOnly, launchMovie);

export default router;
