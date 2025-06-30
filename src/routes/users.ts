import { Router } from "express";
import { createProfile, getAnyProfile, getUserProfile, updateProfile } from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = Router()

router.post("/newprofile", auth, createProfile);
router.get("/me", auth, getUserProfile);
router.get("/:id", auth, getAnyProfile);
router.put("/me/profile", auth, updateProfile);

export default router