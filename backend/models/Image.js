import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
