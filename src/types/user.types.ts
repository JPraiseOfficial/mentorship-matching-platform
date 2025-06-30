import { JwtPayload } from 'jsonwebtoken';

export enum Role {
  Admin = 'Admin',
  Mentor = 'Mentor',
  Mentee = 'Mentee',
}

export interface UserResponse {
  id: number;
  email: string;
  role: Role;
};

export interface MyJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  skills: string;
  goals: string;
}

export interface fullUserProfile extends UserProfile {
  role: string
}
