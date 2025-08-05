import { Router } from "express";
import {
  createProfile,
  getAnyProfile,
  getUserProfile,
  updateProfile,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = Router();

/**
 * @swagger
 * /api/users/newprofile:
 *   post:
 *     summary: Create user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfileDto'
 *     responses:
 *       201:
 *         description: User profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Validation error
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
 *       409:
 *         description: User already has a Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               ResourceExists:
 *                 value:
 *                   message: User has a profile
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/newprofile", auth, createProfile);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User has no profile
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
router.get("/me", auth, getUserProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get any user's profile by ID
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
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
 *       400:
 *         description: Invalid ID parameter
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
router.get("/:id", auth, getAnyProfile);

/**
 * @swagger
 * /api/users/me/profile:
 *   put:
 *     summary: Update current user's profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfileDto'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedProfile:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Validation error
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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/me/profile", auth, updateProfile);

export default router;

// Swagger Components

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProfileDto:
 *       type: object
 *       required:
 *         - name
 *         - bio
 *         - skills
 *         - goals
 *       properties:
 *         name:
 *           type: string
 *           example: Jane Doe
 *         bio:
 *           type: string
 *           example: Experienced software engineer and mentor.
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["JavaScript", "React", "Node.js"]
 *         goals:
 *           type: string
 *           example: To help mentees grow their careers in tech.
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Jane Doe
 *         bio:
 *           type: string
 *           example: Experienced software engineer and mentor.
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["JavaScript", "React", "Node.js"]
 *         goals:
 *           type: string
 *           example: To help mentees grow their careers in tech.
 *         role:
 *           type: string
 *           enum: [Admin, Mentor, Mentee]
 *           example: Mentor
 *         userId:
 *           type: integer
 *           example: 1
 */
