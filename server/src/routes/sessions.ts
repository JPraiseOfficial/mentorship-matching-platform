import { Router } from "express";
import { createSession, deleteSession, getMenteeSessions, getMentorSession, updateFeedbackAndRating } from "../controllers/sessions.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorise.js";

const router = Router()

router.post('/', auth, authorize("Mentee"), createSession);
router.get('/mentor', auth, authorize("Mentor"), getMentorSession);
router.get('/mentee', auth, authorize("Mentee"), getMenteeSessions);
router.put('/:id/feedback', auth, authorize("Mentee"), updateFeedbackAndRating);
router.delete('/delete/:id', auth, authorize("Mentee"), deleteSession);


export default router