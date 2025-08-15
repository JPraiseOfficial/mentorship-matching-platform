import { Router } from "express";
import {
  createRequest,
  getReceivedRequests,
  getSentRequests,
  updateRequestStatus,
  deleteRequest,
} from "../controllers/mentorshipRequests.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorise.js";

const router = Router();

/**
 * @swagger
 * /api/requests/{mentorId}:
 *   post:
 *     summary: Send a mentorship request to a mentor
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: mentorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mentor's user ID
 *     responses:
 *       201:
 *         description: Request has been sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Request has been sent
 *                 request:
 *                   $ref: '#/components/schemas/MenteeMentorshipRequest'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               WrongID:
 *                 value:
 *                   errors:
 *                     mentorId: [ID must be a number]
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
router.post("/:mentorId", auth, authorize("Mentee"), createRequest);

/**
 * @swagger
 * /api/requests/sent:
 *   get:
 *     summary: Get all mentorship requests sent by the current mentee
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of sent mentorship requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenteeMentorshipRequest'
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
router.get("/sent", auth, authorize("Mentee"), getSentRequests);

/**
 * @swagger
 * /api/requests/received:
 *   get:
 *     summary: Get all mentorship requests received by the current mentor
 *     tags: [Mentor]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of received mentorship requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MentorMentorshipRequest'
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
router.get("/received", auth, authorize("Mentor"), getReceivedRequests);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   patch:
 *     summary: Update the status of a mentorship request (Accept/Reject)
 *     tags: [Mentor]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Accepted, Rejected]
 *                 example: Accepted
 *     responses:
 *       200:
 *         description: Request status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MentorMentorshipRequest'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               WrongID:
 *                 value:
 *                   errors:
 *                     id: [ID must be a number]
 *               WrongEnum:
 *                 value:
 *                   errors:
 *                     status: [status should be Accepted or Rejected]
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
router.patch("/:id/status", auth, authorize("Mentor"), updateRequestStatus);

/**
 * @swagger
 * /api/requests/delete/{id}:
 *   delete:
 *     summary: Delete a mentorship request by mentee
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Request ID
 *     responses:
 *       204:
 *         description: Request successfully deleted
 *       404:
 *         description: User has no profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               NotFound:
 *                 value:
 *                   message: Profile not found
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
router.delete("/delete/:id", auth, authorize("Mentee"), deleteRequest);

export default router;
