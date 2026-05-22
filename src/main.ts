import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import router from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', router);
const port = process.env.PORT || 8000;
const host = process.env.HOST;

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});