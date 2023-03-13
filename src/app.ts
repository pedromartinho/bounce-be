import express, { Request, Response } from "express";

const app = express();
const port = 3050;

app.post("/payments", (req: Request, res: Response) => {
  res.send({}).status(Math.random() < 0.5 ? 201 : 400);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});