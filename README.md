# Image Upload API with Cloudinary

## 🚀 Overview
This project provides an API for uploading images to **Cloudinary** using **Multer** for temporary storage and **MongoDB** for storing image metadata. Users can upload, retrieve, and search images efficiently.

## ✨ Features
- Upload images to **Cloudinary**
- Store image metadata in **MongoDB**
- Retrieve images by folder
- Search images by name
- Error handling and validation

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **File Storage**: Cloudinary
- **Middleware**: Multer for file handling
- **Authentication**: JWT (if applicable)

## 📂 Project Structure
```
📦 your-project
├── 📁 models
│   ├── Image.js  # Mongoose schema for image metadata
├── 📁 routes
│   ├── imageRoutes.js  # API routes for image operations
├── 📁 controllers
│   ├── imageController.js  # Logic for uploading, retrieving, and searching images
├── 📁 uploads  # Temporary local storage for image files
├── 📄 .env  # Environment variables (Cloudinary credentials)
├── 📄 server.js  # Main Express server setup
├── 📄 package.json  # Dependencies and scripts
└── 📄 README.md  # Project documentation
```

## 📌 Setup & Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables** (`.env` file)
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MONGO_URI=your_mongodb_connection_string
   ```
4. **Start the server**
   ```sh
   npm start
   ```

## 📤 API Endpoints
### 1️⃣ Upload Image
**POST** `/images`
#### Request (Form Data)
```json
{
  "image": (file),
  "folder": "your-folder-name"
}
```
#### Response
```json
{
  "_id": "64aef2...",
  "name": "image.jpg",
  "url": "https://res.cloudinary.com/...",
  "folder": "your-folder-name"
}
```

### 2️⃣ Get Images (by folder)
**GET** `/images?folder=your-folder-name`

### 3️⃣ Search Images (by name)
**GET** `/images/search?q=image`

## 🚀 Deployment
- Deploy backend on **Render / Railway / Heroku**
- Use **MongoDB Atlas** for cloud database
- Store images in **Cloudinary**

## 🛡️ Security & Best Practices
- Validate file types before upload
- Use `.env` to secure API keys
- Implement JWT authentication (if required)

## 📜 License
This project is licensed under the **MIT License**.

## 🤝 Contributing
Feel free to **fork** this repository and create a **pull request** if you want to contribute! 🚀

## 📸 UI Previews

| Page      | Preview |
|-----------|---------|
| **Home**      | ![Home](https://github.com/user-attachments/assets/b1708681-1c92-44e9-8030-0d68826003f7) |
| **Dashboard** | ![Dashboard](https://github.com/user-attachments/assets/caf035be-9919-4280-be94-62ce654e22e8) |
| **Images**    | ![Images](https://github.com/user-attachments/assets/74d69d80-b9ac-4fae-af29-387a0f5da714) |
| **Login**     | ![Login](https://github.com/user-attachments/assets/57721035-fc9a-4bd9-a8f9-4b16f2a995f6) |
| **Signup**    | ![Signup](https://github.com/user-attachments/assets/a316c281-7ccb-4d0e-86f1-e55ac5ff191a) |
