/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
// const port = 3000;

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router)

app.use(globalErrorHandlers)

//not found
app.use(notFound)

export default app;
