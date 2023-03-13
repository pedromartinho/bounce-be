import express, { Request, Response } from "express";
import { env } from './configs/env.config';

const app = express();
const port = 3050;

app.post("/payments", (req: Request, res: Response) => {
  res.send({}).status(Math.random() < 0.5 ? 201 : 400);
});

app.listen(env.app.port, () => {
  console.log(`Server listening at ${env.app.host}:${env.app.port}`);
});