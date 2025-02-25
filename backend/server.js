

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
const allowedOrigins = process.env.CROSS_ORIGIN;
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

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes.js";
// import imageRoutes from "./routes/imageRoutes.js";
// import folderRoutes from "./routes/folderRoutes.js";
// import path from "path";

// dotenv.config();

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error.message);
//     process.exit(1);
//   }
// };

// connectDB();

// const app = express();
// app.use(express.json());



// import cors from "cors";
// import express from "express";



// // CORS Middleware Configuration
// app.use(
//   cors({
//     origin: "http://localhost:5173", // ✅ Specify frontend URL (No '*')
//     credentials: true, // ✅ Allow cookies & authentication headers
//     allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow required headers
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Allowed HTTP methods
//   })
// );

// // Enable Express to parse JSON requests
// app.use(express.json());

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


// // ✅ API Routes
// app.get("/", (req, res) => {
//   res.send("🚀 API is running...");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/folders", folderRoutes);
// app.use("/api/images", imageRoutes);

// // ✅ Serve Uploaded Images
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// // ✅ Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.message);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// process.on("unhandledRejection", (err) => {
//   console.error("❌ Unhandled Rejection:", err.message);
//   process.exit(1);
// });
