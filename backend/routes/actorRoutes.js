import express from 'express';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { creaateActor } from '../controllers/actorController.js';

const router = express.Router();

router.use(protect);

router.route('/createActor').post(adminOnly, creaateActor);

export default router;