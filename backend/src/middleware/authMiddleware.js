import jwt from "jsonwebtoken";
import User from "../models/User.js";


const authMiddleware = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("no token provided");
            return res.status(401).json({error: "no token provided"});
        }

        const decoded = jwt.verify(token,  process.env.JWT_SECRET);
        if (!decoded) {
            console.log( "invalid token");
            return res.status(401).json({error: "invalid token"});
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            console.log("User not found");
            return res.status(401).json({error: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Not authorized"})
    }
}


export default authMiddleware;