import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken"



export const registerAccount = async(req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User registered sucessfully!"})
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: error.message});
    }
}  


export const loginAccount = async(req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user){
            return res.status(401).json({ message: "Invalid email or password."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password"})
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );
        
        res.cookie("token", token, {
            httpOnly: true,                 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "none",        
            maxAge: 24 * 60 * 60 * 1000    // 1 day
        });
        res.status(200).json({ message: "Login successful", user: username});
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: error.message });
    }
}



