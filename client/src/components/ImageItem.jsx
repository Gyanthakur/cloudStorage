

function ImageItem({ image }) {
  console.log("Image data:", image); // Debugging

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is set in .env file
  const imageUrl = image?.url?.startsWith("http") 
    ? image.url 
    : `${backendUrl}${image.url}`;

  return (
    <div className="relative group border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {image?.url ? (
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <img 
            className="w-full h-40 md:h-48 object-cover rounded-lg cursor-pointer" 
            src={imageUrl} 
            alt={image.name || "Uploaded image"} 
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/fallback-image.png"; // Use a placeholder if the image fails to load
            }}
          />
        </a>
      ) : (
        <div className="flex items-center justify-center h-40 md:h-48 bg-gray-200">
          <p className="text-gray-500">No image available</p>
        </div>
      )}

      {/* Image Name Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {image.name}
      </div>
    </div>
  );
}

export default ImageItem;
