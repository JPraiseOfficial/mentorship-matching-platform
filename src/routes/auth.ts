import { Router } from "express";
import { getUser, register } from "../controllers/auth/auth.user.js";
import { login, logout } from "../controllers/auth/auth.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", auth, getUser);

export default router;
