// import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

// export const connectDB = async () => {
//     try {
//         await prisma.$connect();
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("Error connecting to the database:", error)
//         process.exit(1);
//     }
// }

import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error)
        process.exit(1);
    }
}