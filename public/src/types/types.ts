type Role = "Admin" | "Mentor" | "Mentee";

export interface User {
  id: number;
  name?: string | undefined;
  email: string;
  role: Role;
}

export interface ProfileFormData {
  name: string;
  bio: string;
  skills: string[];
  goals: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
}
