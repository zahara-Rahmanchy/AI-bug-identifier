import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { bugsRoutes } from './routes/bugsRoute';
import globalErrorHandler from './errors/globalErrorHandler';

dotenv.config()
const PORT = process.env.PORT;
console.log("p: ",PORT)
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use("/",bugsRoutes)

app.use(globalErrorHandler)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});