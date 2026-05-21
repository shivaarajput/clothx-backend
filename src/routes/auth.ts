import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

const users: any[] = [];


// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    email,
    password: hashedPassword,
  });

  return res.json({
    message: "User registered",
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.json({
    token,
  });
});

// PROTECTED
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);

export default router;