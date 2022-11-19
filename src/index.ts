import * as cron from 'node-cron';

import prisma from './lib/prisma';
import getHockey from './external/hockey';
import getBaseball from './external/baseball';
import getFootball from './external/football';

console.log('---------------------');
console.log(`[${new Date()}] Started cron job scheduler...`);
console.log('---------------------');

// Run at 08:00 AM every day.
cron.schedule('00 08 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NHL Logging`);

  // Get all NHL players.
  getHockey().finally(() => {
    console.log(`[${new Date()}] Completed Cron Job for NHL Logging`);
    console.log('---------------------');
  });
});

// Run at 08:30 AM every day.
cron.schedule('30 08 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for MLB Logging`);

  // Get all MLB players.
  getBaseball().finally(() => {
    console.log(`[${new Date()}] Completed Cron Job for MLB Logging`);
    console.log('---------------------');
  });
});

// Run at 09:00 AM every day.
cron.schedule('00 09 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NFL Logging`);

  // Get all NFL players.
  getFootball().finally(() => {
    console.log(`[${new Date()}] Completed Cron Job for NFL Logging`);
    console.log('---------------------');
  });
});

process.on('SIGTERM', async () => {
  try {
    await prisma.$disconnect();
  } catch {}

  console.log('---------------------');
  console.log(`[${new Date()}] Ended cron job scheduler...`);
  console.log('---------------------');
});
