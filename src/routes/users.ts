import { Router } from "express";
import { createProfile } from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = Router()

router.post("/newprofile", auth, createProfile)

export default router