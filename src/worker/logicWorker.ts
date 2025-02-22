import { emailQueue, redis } from '../utils/queue';
import { Worker } from 'bullmq';
import { processLogic } from '../utils/processLogic';

import * as dotenv from 'dotenv';

const logicWorker = new Worker(
  'logicQueue',
  async (job) => {
    try {
      dotenv.config();
      const { type, id, userId, otherInfo } = job.data;
      const emailDatas = await processLogic({ type, id, userId, otherInfo });

      if (Array.isArray(emailDatas)) {
        for (const emailData of emailDatas) {
          await emailQueue.add('emailQueue', emailData, {
            backoff: { type: 'exponential', delay: 1000 },
            attempts: 3,
          });
        }
      } else {
        await emailQueue.add('emailQueue', emailDatas, {
          backoff: { type: 'exponential', delay: 1000 },
          attempts: 3,
        });
      }

      console.log(`Logic processed for type ${type}, email queued.`);
    } catch (error) {
      console.error(`Failed to process logic for job ${job.id}:`, error);
    }
  },
  {
    connection: redis,
  },
);

console.log('Logic worker started');
