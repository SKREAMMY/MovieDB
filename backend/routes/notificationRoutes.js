import express from 'express';
import { protect } from '../middleware/auth';

const routes = express.Router();

routes.use(protect);

routes.get("/", getNotfications);