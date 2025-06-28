import { Router } from "express";
import { register } from "../controllers/auth.js";
import { login, logout } from "../controllers/login.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;