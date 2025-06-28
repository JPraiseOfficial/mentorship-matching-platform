import { Router } from "express";
import { register } from "../controllers/user.js";
import { login, logout } from "../controllers/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;