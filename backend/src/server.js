import "dotenv/config"
import app from "./app.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import initChatSocket from "./controllers/chatController.js";
import { Server } from "socket.io"
import http from "http"
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/authMiddleware.js";
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});


io.use((socket, next) => {
    cookieParser()(socket.request, {}, () => {
        const mockRes = {
            status: function() { return this; },
            json: function(data) { return next(new Error(data.error || "Not authorized")); }
        };

        authMiddleware(socket.request, mockRes, () => {
            if (socket.request.user) {
                socket.user = socket.request.user; 
                return next();
            }
            return next(new Error("Not authorized"));
        });
    });
});

initChatSocket(io)

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("CHAT APP API is Running.");
});

server.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});