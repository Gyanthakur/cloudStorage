function FolderItem({ folder, setSelectedFolder }) {
    return (
      <div
        onClick={() => setSelectedFolder(folder._id)}
        className="p-4 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
      >
        📁 {folder.name}
      </div>
    );
  }
  
  export default FolderItem;
  