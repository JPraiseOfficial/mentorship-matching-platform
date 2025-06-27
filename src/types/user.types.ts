export interface UserResponse {
  id: string;
  email: string;
  role: 'mentor' | 'mentee' | 'admin';
};
