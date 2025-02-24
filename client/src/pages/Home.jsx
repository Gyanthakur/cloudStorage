import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user?.token) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 px-4 py-8">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 md:p-10 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H5.5z"></path>
                <path d="M9 13h2v3H9v-3z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-600 leading-tight">
            Welcome to Cloud Storage
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Securely store and manage your files anytime, anywhere.
          </p>
          <p className="text-gray-500">
            Your files, your control. Simple, secure, and always accessible.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleGetStarted}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:-translate-y-1"
          >
            Get Started
          </button>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#features" className="text-blue-600 hover:text-blue-800 transition">
                Features
              </a>
              <a href="#pricing" className="text-blue-600 hover:text-blue-800 transition">
                Pricing
              </a>
              <a href="#faq" className="text-blue-600 hover:text-blue-800 transition">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 text-gray-600 text-sm">
        <p>© 2025 Drive Clone. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;