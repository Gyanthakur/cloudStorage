// import express from "express";
// import { getImages, uploadImage } from "../controllers/imageController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import multer from "multer";

// const router = express.Router();

// // Configure Multer (for file uploads)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save images inside "uploads/" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filename
//   },
// });
// const upload = multer({ storage });

// // Routes
// router.get("/", protect, getImages);  // ✅ Get images
// router.post("/", protect, upload.single("image"), uploadImage);  // ✅ Upload image

// export default router;



import express from "express";
import { upload, uploadImage, getImages, searchImages } from "../controllers/imageController.js";

const router = express.Router();

router.post("/", upload, uploadImage);
router.get("/", getImages);
router.get("/search", searchImages);

export default router;
