import "dotenv/config"
import app from "./app.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("CHAT APP API is Running.");
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});