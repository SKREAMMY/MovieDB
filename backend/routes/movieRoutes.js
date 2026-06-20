import express from "express";
import { watchMovie, reviewMovie, createMovie } from '../controllers/movieControllers.js';


const router = express.Router();

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

router.use(protect);

router.route('/createMovie').post(adminOnly, createMovie);

router.post("/:id/watch", watchMovie);
router.post("/:id/reviews", reviewMovie);

export default router;
