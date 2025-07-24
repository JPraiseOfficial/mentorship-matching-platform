import { useEffect, useState, type ReactNode } from "react";
import { API } from "../services/api.js";
import { AuthContext } from "./AuthContext.js";
import type { User } from "../types/types.js";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("auth/me");
        setUser(res.data);
      } catch (error) {
        console.log("Error fetching User:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    await API.post("/auth/login", { email, password });
    const res = await API.get("/auth/me");
    setUser(res.data);
  };

  const logout = async () => {
    await API.post("/auth/logout", {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
