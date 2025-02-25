

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS Configuration
// const allowedOrigins = process.env.CROSS_ORIGIN;
const allowedOrigins ="https://cloud-storage-2ksk.vercel.app";
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("API is running...");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/images", imageRoutes);

// Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Handle Uncaught Errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});
