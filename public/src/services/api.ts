import axios from "axios";
import type { ProfileFormData, RegisterFormData } from "../types/types.ts";
import type { User } from "../types/types";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// AUTH ROUTES
export const loginUser = async (email: string, password: string) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const getUser = async (): Promise<User> => {
  const response = await API.get("/auth/me");
  return response.data;
};

export const registerUser = async (data: RegisterFormData) => {
  const response = await API.post("/auth/register", { ...data });
  return response.data;
};

// USER PROFILE ROUTES
export const createProfile = async (data: ProfileFormData) => {
  const response = await API.post("/users/newprofile", { ...data });
  return response.data;
};

// ADMIN ROUTES
export const getAllUsers = async (): Promise<User[]> => {
  const response = await API.get("/admin/users");
  return response.data;
};
