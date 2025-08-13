import { Router } from "express";
import {
  createAvailability,
  getAvailability,
  deleteAvailability,
  deleteAllAvailability,
} from "../controllers/mentorAvailability.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorise.js";

const router = Router();

/**
 * @swagger
 * /api/availability/add:
 *   post:
 *     summary: Add a new availability slot for the current mentor
 *     tags: [Mentor]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAvailabilityDto'
 *     responses:
 *       201:
 *         description: Successfully created availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully created availability
 *                 availability:
 *                   $ref: '#/components/schemas/Availability'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               MentorAvailability:
 *                 value:
 *                   day: ["Day is required"]
 *                   startTime: ["Time must be valid in HH:mm:ss format"]
 *                   endTime: ["Time must be valid in HH:mm:ss format"]
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
router.post("/add", auth, authorize("Mentor"), createAvailability);

/**
 * @swagger
 * /api/availability/me:
 *   get:
 *     summary: Get all availability slots for the current mentor
 *     tags: [Mentor]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 availability:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Availability'
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
router.get("/me", auth, authorize("Mentor"), getAvailability);

/**
 * @swagger
 * /api/availability/{id}:
 *   get:
 *     summary: Get all availability slots for a mentor by user ID
 *     tags: [Mentee]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mentor's user ID
 *     responses:
 *       200:
 *         description: Successfully fetched availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully fetched availability
 *                 availability:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Availability'
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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", auth, getAvailability);

/**
 * @swagger
 * /api/availability/delete/{id}:
 *   delete:
 *     summary: Delete an availability slot by slot ID
 *     tags: [Mentor]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Availability slot ID
 *     responses:
 *       200:
 *         description: Successfully deleted availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully deleted availability
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
 *       404:
 *         description: Availability not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               NotFound:
 *                 value:
 *                   message: Availability not found
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
router.delete("/delete/:id", auth, authorize("Mentor"), deleteAvailability);

/**
 * @swagger
 * /api/availability/delete:
 *   delete:
 *     summary: Delete all availability slots for the current mentor
 *     tags: [Mentor]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted all availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully deleted all availability
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
router.delete("/delete", auth, authorize("Mentor"), deleteAllAvailability);

export default router;
