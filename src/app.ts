import express from "express";
import { env } from './configs/env.config';
import { router } from './api/routes/index';
import { HandleErrorsMiddleware } from "./api/middlewares/error-handler.middleware";

const app = express();

app.use(express.json());
app.use('/', router);
app.use(HandleErrorsMiddleware.routeNotFound);
app.use(HandleErrorsMiddleware.unhandledErrors);

app.listen(env.app.port, () => {
  console.log(`Server listening at ${env.app.host}:${env.app.port}`);
});