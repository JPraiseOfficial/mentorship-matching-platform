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
