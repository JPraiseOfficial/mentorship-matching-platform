import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
