import multer from "multer";
import path from "path";
import Image from "../models/Image.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage }).single("image");

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { folder } = req.body;
    const image = new Image({
      name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      folder,
    });

    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};

export const getImages = async (req, res) => {
  try {
    const folder = req.query.folder;
    const images = await Image.find(folder ? { folder } : {});
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
};

export const searchImages = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const images = await Image.find({ name: new RegExp(searchQuery, "i") });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error searching images", error });
  }
};
