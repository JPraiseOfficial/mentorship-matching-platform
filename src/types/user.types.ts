export interface UserResponse {
  id: number;
  email: string;
  role: 'Mentor' | 'Mentee' | 'Admin';
};
