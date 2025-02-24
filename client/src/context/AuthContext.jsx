import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  const signup = async (userData) => {
    try {
      const { data } = await api.post("/auth/signup", userData);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
