import axios from "axios";
import type {
  ProfileFormData,
  RegisterFormData,
  Role,
  UserProfile,
} from "../types/types.ts";
import type { User } from "../types/types";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// AUTH ROUTES
// Login and getUser are in the AuthContext
export const registerUser = async (data: RegisterFormData) => {
  const response = await API.post("/auth/register", { ...data });
  return response.data;
};

// USER PROFILE ROUTES
export const createProfile = async (data: ProfileFormData) => {
  const response = await API.post("/users/newprofile", { ...data });
  return response.data;
};

export const getProfile = async (): Promise<ProfileFormData> => {
  const response = await API.get("/users/me");
  return response.data;
};

export const getOthersProfile = async (id: number): Promise<UserProfile> => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

// ADMIN ROUTES
export const getAllUsers = async (): Promise<User[]> => {
  const response = await API.get("/admin/users");
  return response.data;
};

export const updateRole = async (userId: number, role: Role) => {
  const response = await API.put(`/admin/users/${userId}/role`, { role });
  return response.data;
};
