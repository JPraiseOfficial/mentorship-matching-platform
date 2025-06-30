import { Router } from "express";
import { createProfile, getAnyProfile, getUserProfile } from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = Router()

router.post("/newprofile", auth, createProfile)
router.get("/me", auth, getUserProfile)
router.get("/:id", auth, getAnyProfile)


export default router