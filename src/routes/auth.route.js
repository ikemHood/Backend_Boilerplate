import { login, register, logout, getMe } from "../controllers/auth.controller.js";
import { Router } from "express";
import validateEntryData from "../helpers/validateEntryData.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/logout", logout);
router.get("/me", authenticate, getMe);
router.post("/login", validateEntryData.auth.login, login);
router.post("/register", validateEntryData.auth.register, register);

export default router;