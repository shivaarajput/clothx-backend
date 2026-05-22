import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = Router();

router.post('/auth/register', AuthController.signup);
router.post('/auth/login', AuthController.login);

export default router;