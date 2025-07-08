import { JwtPayload } from 'jsonwebtoken';
import { RequestStatus, Profile } from '@prisma/client';

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
  id: number;
  name: string;
  bio: string;
  skills: string[];
  goals: string;
  userId: number;
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

// Mentorship Requests Types
export interface createMentorshipRequest {
  mentorId: number;
  menteeId: number;
}

export interface MenteeMentorshipRequest {
  id: number;
  mentorId: number;
  mentor: {
    name: string | undefined;
    bio: string | undefined;
    skills: string[] | undefined;
    goals: string | undefined;
  } 
  status: RequestStatus;
  createdAt: Date;
}

export interface MentorMentorshipRequest {
  id: number;
  menteeId: number;
  mentee: {
    name: string | undefined;
    bio: string | undefined;
    skills: string[] | undefined;
    goals: string | undefined;
  } 
  status: RequestStatus;
  createdAt: Date;
}

// Session Types
export interface createSessionType {
  mentorId: number;
  menteeId: number;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm:ss format
}

interface Session {
  id: number;
  mentorId: number;
  menteeId: number;
  dateTime: Date;
  feedback?: string | null;
  rating?: number | null;
  createdAt: Date;

}
export interface MenteeSession extends Session {
  mentor: {
    name?: string,
    skills?: string[],
  }
}

export interface MentorSession extends Session {
  mentee: {
    name?: string,
    bio?: string,
    skills?: string[],
  }
}

// Admin Types
export interface GetAllUsersType {
    id: number,
    name: String | undefined,
    email: String,
    role: Role,
}