import * as cron from 'node-cron';

import getHockey from './external/hockey';
import getBaseball from './external/baseball';

console.log('---------------------');
console.log(`[${new Date()}] Started cron job scheduler...`);
console.log('---------------------');

// Run at 08:00 PM every day.
cron.schedule('00 08 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NHL Logging`);

  // Get all NHL players.
  getHockey().finally(() => {
    console.log(`[${new Date()}] Completed Cron Job for NHL Logging`);
    console.log('---------------------');
  });
});

// Run at 08:30 PM every day.
cron.schedule('30 08 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for MLB Logging`);

  // Get all MLB players.
  getBaseball().finally(() => {
    console.log(`[${new Date()}] Completed Cron Job for MLB Logging`);
    console.log('---------------------');
  });
});

process.on('SIGTERM', () => {
  console.log('---------------------');
  console.log(`[${new Date()}] Ended cron job scheduler...`);
  console.log('---------------------');
});
