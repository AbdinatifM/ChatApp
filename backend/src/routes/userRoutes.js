import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addFriend, getFriends } from '../controllers/userController.js';

const router = express.Router();

router.post("/add", authMiddleware, addFriend);
router.get("/list", authMiddleware, getFriends);
















export default router; 