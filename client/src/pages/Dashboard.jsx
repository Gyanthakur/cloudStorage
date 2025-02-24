import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import FolderItem from "../components/FolderItem";
import ImageItem from "../components/ImageItem";
import { toast } from "react-toastify";

const   Dashboard =() =>{
  const { user } = useContext(AuthContext);

  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");

  useEffect(() => {
    if (user?.token) {
      fetchFolders();
      fetchImages();
    }
  }, [selectedFolder, user?.token]);

  const fetchFolders = useCallback(async () => {
    try {
      const { data } = await api.get(`/folders?parent=${selectedFolder || ""}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setFolders(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching folders.");
    }
  }, [selectedFolder, user?.token]);



  const fetchImages = useCallback(async () => {
    if (!selectedFolder && !search.trim()) {
      setImages([]); // Don't show images if no folder is selected and no search query exists
      return;
    }
  
    try {
      const endpoint = selectedFolder 
        ? `/images?folder=${selectedFolder}` 
        : `/images?search=${search.trim()}`; // Fetch images only when searched
  
      const { data } = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error(error.response?.data?.message || "Error fetching images.");
    }
  }, [selectedFolder, search, user?.token]);
  



  const createFolder = async () => {
    if (!newFolder.trim()) return toast.warning("Folder name cannot be empty!");

    try {
      setLoading(true);
      const { data } = await api.post(
        "/folders",
        { name: newFolder, parent: selectedFolder },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setNewFolder("");
      setFolders([...folders, data]);
      toast.success("Folder created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating folder.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return toast.warning("Please select an image to upload.");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("folder", selectedFolder);

    try {
      setLoading(true);
      const { data } = await api.post("/images", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setImages([...images, data]);
      setImageFile(null);
      setUploadFileName("");
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setUploadFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">My Drive</h1>
          <div className="flex items-center space-x-2 text-blue-100">
            <button 
              onClick={() => setSelectedFolder(null)} 
              className="hover:text-white transition flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Root
            </button>
            {selectedFolder && (
              <>
                <span>/</span>
                <span className="font-medium">{selectedFolder}</span>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="New folder name..."
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onKeyPress={(e) => e.key === 'Enter' && createFolder()}
              />
              <button
                onClick={createFolder}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all flex items-center"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                {loading ? "Creating..." : "Create Folder"}
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-64 p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Upload Section - Only visible when in a folder */}
          {selectedFolder && (
            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Upload Files</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full p-2 border border-gray-300 rounded-md bg-white flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="truncate text-gray-500">
                      {uploadFileName || "Choose an image..."}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleImageUpload}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all flex items-center justify-center"
                  disabled={loading || !imageFile}
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          )}

          {/* Folders Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Folders
            </h2>
            {folders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {folders.map((folder) => (
                  <FolderItem key={folder._id} folder={folder} setSelectedFolder={setSelectedFolder} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <p className="text-gray-500">No folders available</p>
                <p className="text-sm text-gray-400 mt-1">Create a new folder to get started</p>
              </div>
            )}
          </div>

          {/* Images Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Images
            </h2>
            {selectedFolder ? (
              images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {images
                    .filter((img) => img?.name?.toLowerCase().includes(search.toLowerCase()))
                    .map((image) => <ImageItem key={image._id} image={image} />)
                  }
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No images available</p>
                  <p className="text-sm text-gray-400 mt-1">Upload images to this folder</p>
                </div>
              )
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-500">Select a folder to view images</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;