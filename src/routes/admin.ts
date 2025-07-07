import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/authorise.js";
import { getAllUsers, updateUserRole } from "../controllers/admin.js";

const router = Router()

router.get("/users", auth, authorize("Admin"), getAllUsers);
router.put("/users/:id/role", auth, authorize("Admin"), updateUserRole)

export default router