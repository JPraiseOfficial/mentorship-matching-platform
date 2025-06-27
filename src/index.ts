import app from "./app.js";
import { connectDB } from "./config/prisma.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on port ${PORT}`)
})