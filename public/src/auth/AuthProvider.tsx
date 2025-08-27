import { useEffect, useState, type ReactNode } from "react";
import { API, getProfile } from "../services/api.js";
import { AuthContext } from "./AuthContext.js";
import type { User } from "../types/types.js";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const res = await API.get("auth/me");
          setUser(res.data);
        }
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
    const profile = await getProfile();
    const currentUser = { ...res.data, name: profile.name || null };
    setUser(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  };

  const logout = async () => {
    await API.post("/auth/logout", {});
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
