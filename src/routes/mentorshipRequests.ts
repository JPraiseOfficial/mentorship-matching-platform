import { Router } from "express";
import { createRequest, getReceivedRequests, getSentRequests, updateRequestStatus, deleteRequest } from "../controllers/mentorshipRequests";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorise";

const router = Router();

router.post("/:mentorId", auth, authorize("Mentee"), createRequest);
router.get("/sent", auth, authorize("Mentee"), getSentRequests);
router.get("/received", auth, authorize("Mentor"), getReceivedRequests);
router.patch("/:id/status", auth, authorize("Mentor"), updateRequestStatus);
router.delete("/delete/:id", auth, authorize("Mentee"), deleteRequest);

export default router;
