import app from "./app";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes"
connectDB();


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("CHAT APP API is Running.");
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});