import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define types for the user and context value
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value of type AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      axios.get("/api/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("authToken", res.data.token); // Storing the token with the correct key
      setUser(res.data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
