import Folder from "../models/Folder.js";

export const createFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const folder = new Folder({ name, parent: parent || null });
    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: "Error creating folder", error });
  }
};

export const getFolders = async (req, res) => {
  try {
    const parent = req.query.parent || null;
    const folders = await Folder.find({ parent });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching folders", error });
  }
};







