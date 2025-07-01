import { JwtPayload } from 'jsonwebtoken';

export enum Role {
  Admin = 'Admin',
  Mentor = 'Mentor',
  Mentee = 'Mentee',
}

export enum Day {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
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

export interface Availability {
  id: number;
  day: Day;
  startTime: string;
  endTime: string;
}