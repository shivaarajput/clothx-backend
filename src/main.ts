import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  // code to handle the request
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});