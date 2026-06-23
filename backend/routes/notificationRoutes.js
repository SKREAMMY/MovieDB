import express from 'express';
import { protect } from '../middleware/auth.js';
import { getNotfications } from '../controllers/notificationController.js';

const routes = express.Router();

routes.use(protect);

routes.get("/", getNotfications);

export default routes;