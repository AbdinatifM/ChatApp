import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { loginAccount, registerAccount } from "../controllers/authController";

const router = express.Router();

router.post("/login", loginAccount);
router.post("/register", registerAccount);
router.get("/me",  authMiddleware, (req, res) => {
    res.json(req.user);
});


export default router;