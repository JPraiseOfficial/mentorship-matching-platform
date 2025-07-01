import express from "express";
import cookieParser from "cookie-parser";

// Importing routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import availabilityRoutes from "./routes/mentorAvailability.js";
import mentorshipRequestsRoutes from "./routes/mentorshipRequests.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/requests", mentorshipRequestsRoutes);

export default app;
