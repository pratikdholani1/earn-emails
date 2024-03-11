import cron from 'node-cron';
import { logicQueue } from './queue';

cron.schedule('*/10 * * * *', () => {
  console.log('Triggering deadline3days email job');
  logicQueue.add('processLogic', { type: 'deadline3days' });
});

cron.schedule('*/10 * * * *', () => {
  console.log('Triggering deadlineExceeded email job');
  logicQueue.add('processLogic', { type: 'deadlineExceeded' });
});

cron.schedule('*/10 * * * *', () => {
  console.log('Triggering deadlineExceededWeek email job');
  logicQueue.add('processLogic', { type: 'deadlineExceededWeek' });
});

cron.schedule('*/10 * * * *', () => {
  console.log('Triggering weeklyListingRoundup email job');
  logicQueue.add('processLogic', { type: 'weeklyListingRoundup' });
});
