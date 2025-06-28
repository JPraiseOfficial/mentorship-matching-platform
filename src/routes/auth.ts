import { Router } from "express";
import { getUser, register } from "../controllers/user.js";
import { login, logout } from "../controllers/auth.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", auth, getUser)

export default router;