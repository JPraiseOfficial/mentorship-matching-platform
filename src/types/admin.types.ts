import { Role } from "@prisma/client";

export interface GetAllUsersType {
    id: number,
    name: String | undefined,
    email: String,
    role: Role,
}