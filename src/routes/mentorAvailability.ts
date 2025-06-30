import { Router } from "express";
import { createAvailability } from "../controllers/mentorAvailability";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorise";

const router = Router();

router.post("/add", auth, authorize("Mentor"), createAvailability);

export default router;