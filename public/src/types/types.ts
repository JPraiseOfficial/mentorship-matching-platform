type Role = "Admin" | "Mentor" | "Mentee";

export interface User {
  id: number;
  name?: string | undefined;
  email: string;
  role: Role;
}
