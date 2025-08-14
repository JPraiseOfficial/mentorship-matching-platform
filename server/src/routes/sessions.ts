import { Router } from "express";
import {
  createSession,
  deleteSession,
  getMenteeSessions,
  getMentorSession,
  updateFeedbackAndRating,
} from "../controllers/sessions.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorise.js";

const router = Router();

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Schedule a new mentorship session (Mentee only)
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSessionDto'
 *     responses:
 *       201:
 *         description: Session has been scheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session has been scheduled successfully
 *                 session:
 *                   $ref: '#/components/schemas/MenteeSession'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               SessionValidation:
 *                 value:
 *                   mentorId: [ID must be a number]
 *                   date: [Date must be in YYYY-MM-DD format]
 *                   time: [Time must be valid in HH:mm:ss format]
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Unauthorised:
 *                 value:
 *                   message: Unauthorised user
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Forbidden:
 *                 value:
 *                   message: Forbidden
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", auth, authorize("Mentee"), createSession);

/**
 * @swagger
 * /api/sessions/mentor:
 *   get:
 *     summary: Get all sessions for the current mentor
 *     tags: [Mentor]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of mentor sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MentorSession'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Unauthorised:
 *                 value:
 *                   message: Unauthorised user
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Forbidden:
 *                 value:
 *                   message: Forbidden
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/mentor", auth, authorize("Mentor"), getMentorSession);

/**
 * @swagger
 * /api/sessions/mentee:
 *   get:
 *     summary: Get all sessions for the current mentee
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of mentee sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenteeSession'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Unauthorised:
 *                 value:
 *                   message: Unauthorised user
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Forbidden:
 *                 value:
 *                   message: Forbidden
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/mentee", auth, authorize("Mentee"), getMenteeSessions);

/**
 * @swagger
 * /api/sessions/{id}/feedback:
 *   put:
 *     summary: Add feedback and rating for a session (Mentee only)
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - feedback
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               feedback:
 *                 type: string
 *                 minLength: 20
 *                 example: "The session was very helpful and insightful."
 *     responses:
 *       200:
 *         description: Feedback and rating added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Feedback and Rating added successfully
 *                 updatedRequest:
 *                   $ref: '#/components/schemas/MenteeSession'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               FeedbackValidation:
 *                 value:
 *                   rating: ["Please, rate the session on the scale of 1-5"]
 *                   feedback: ["Please, leave a comment about the session"]
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Unauthorised:
 *                 value:
 *                   message: Unauthorised user
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Forbidden:
 *                 value:
 *                   message: Forbidden
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               NotFound:
 *                 value:
 *                   message: Session not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id/feedback", auth, authorize("Mentee"), updateFeedbackAndRating);

/**
 * @swagger
 * /api/sessions/delete/{id}:
 *   delete:
 *     summary: Delete a session (Mentee only)
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Session ID
 *     responses:
 *       204:
 *         description: Session deleted successfully
 *       400:
 *         description: Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               WrongID:
 *                 value:
 *                   errors:
 *                     id: [ID must be a number]
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Unauthorised:
 *                 value:
 *                   message: Unauthorised user
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               Forbidden:
 *                 value:
 *                   message: Forbidden
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               NotFound:
 *                 value:
 *                   message: Session not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/delete/:id", auth, authorize("Mentee"), deleteSession);

export default router;
