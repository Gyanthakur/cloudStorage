import express from "express";
import { createFolder, getFolders } from "../controllers/folderController.js";

const router = express.Router();

router.post("/", createFolder);
router.get("/", getFolders);

export default router;
