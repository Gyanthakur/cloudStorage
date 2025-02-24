import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-bold text-xl tracking-wide hover:text-gray-200 transition flex items-center"
        >
          <span className="mr-2">🚀</span>
          <span>Cloud Storage</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200"
          onClick={toggleMenu}
        >
          <svg 
            className="fill-current h-4 w-4" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
        
        {/* Menu items */}
        <div 
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:flex md:w-auto md:items-center mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 md:py-0 hover:text-gray-200 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition mt-2 md:mt-0"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 md:py-0 hover:text-gray-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium transition block mt-2 md:mt-0 text-center"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;