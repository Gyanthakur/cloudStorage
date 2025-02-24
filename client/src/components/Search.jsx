import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchImages = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/images/search?query=${query}`);
    setResults(res.data);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search Images"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={searchImages} className="bg-blue-500 px-4 py-2 rounded">
        Search
      </button>

      <ul className="mt-4">
        {results.map(img => (
          <li key={img._id} className="border p-2 my-2">
            <img src={img.url} alt={img.name} className="w-16 h-16 inline-block" />
            {img.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
