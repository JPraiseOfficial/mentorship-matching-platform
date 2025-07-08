import { Router } from "express";
import { createAvailability, getAvailability, deleteAvailability, deleteAllAvailability } from "../controllers/mentorAvailability.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorise.js";

const router = Router();

router.post("/add", auth, authorize("Mentor"), createAvailability);
router.get("/me", auth, authorize("Mentor"), getAvailability);
router.get("/:id", auth, getAvailability);
router.delete("/delete/:id", auth, authorize("Mentor"), deleteAvailability);
router.delete("/delete", auth, authorize("Mentor"), deleteAllAvailability);

export default router;