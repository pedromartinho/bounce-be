import express from "express";
import cors from 'cors';
import { router } from '../api/routes/index';
import ErrorHandlerMiddleware from "../api/middlewares/error-handler.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(ErrorHandlerMiddleware.routeNotFound);
app.use(ErrorHandlerMiddleware.handleErrors);

export default app;