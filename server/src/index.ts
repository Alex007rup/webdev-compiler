import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from "dotenv";
import { dbConnect } from './lib/dbConnet';
import { compilerRouter } from './routes/compilerRouter';

const app = express();

app.use(express.json());
app.use(cors());
config();

app.use("/compiler", compilerRouter);

dbConnect();
app.listen(process.env.PORT, () => {
  console.log("http://localhost:4000");
  console.log('Server is running on port 4000');
})