import { Router } from "express";
import { createRequest } from "../controllers/mentorshipRequests";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorise";

const router = Router();

router.post("/:mentorId", auth, authorize("Mentee"), createRequest);
// router.get("/sent", auth, authorize("Mentee"), getSentRequests);

export default router;
