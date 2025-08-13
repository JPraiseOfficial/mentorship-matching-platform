import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./docs/swagger.config.js";

// Importing routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import availabilityRoutes from "./routes/mentorAvailability.js";
import mentorshipRequestsRoutes from "./routes/mentorshipRequests.js";
import sessionRoutes from "./routes/sessions.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
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
app.use("/api/sessions", sessionRoutes);
app.use("/api/admin", adminRoutes);

// Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
