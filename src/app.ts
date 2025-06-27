import express from "express"
import authRoutes from "./routes/auth.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send("Hello, World! About to begin!");
});

app.use("/api/auth", authRoutes);

export default app