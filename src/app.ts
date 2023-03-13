import bodyParser from 'body-parser';
import express from "express";
import { env } from './configs/env.config';
import { router } from './api/routes/index';

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(env.app.port, () => {
  console.log(`Server listening at ${env.app.host}:${env.app.port}`);
});