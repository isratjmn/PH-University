/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);
// api/v1/students/create-student
// Application Routes
app.use('/api/v1', router);
const test = async (req: Request, res: Response) => {
  Promise.reject();
  const a = 10;
  res.send(a);
};
app.get('/', test);

app.use(globalErrorHandler);

// Not Found Route
app.use(notFound);
export default app;
