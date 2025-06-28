import express from "express"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send("Hello, World! About to begin!");
});

app.use("/api/auth", authRoutes);

export default app