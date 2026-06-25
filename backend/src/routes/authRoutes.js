import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { loginAccount, registerAccount } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAccount);
router.post("/register", registerAccount);
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    });
    return res.status(200).json({ message: "Logged out!" });
});
router.get("/me",  authMiddleware, (req, res) => {
    const userObj = req.user.toObject();
    delete userObj.password;
    res.status(200).json({ user: userObj });
});



export default router;