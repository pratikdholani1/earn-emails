import express, { Request, Response } from 'express';
import { logicQueue } from './utils/queue';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import './worker/logicWorker';
import './worker/emailWorker';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/email', async (req: Request, res: Response) => {
  const { type, id, userId } = req.body;
  await logicQueue.add('processLogic', { type, id, userId });
  res.send('Email processing initiated.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
