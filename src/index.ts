import * as cron from 'node-cron';

import prisma from './lib/prisma';
import getHockey from './external/hockey';
import getBaseball from './external/baseball';
import getFootball from './external/football';

process.on('SIGTERM', async () => {
  try {
    await prisma.$disconnect();
  } catch {}

  console.log('---------------------');
  console.log(`[${new Date()}] Ended cron job scheduler...`);
  console.log('---------------------');
});

// Run at 08:00 AM every day.
cron.schedule('00 08 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NHL Logging`);

  // Get all NHL players.
  getHockey()
    .then(() => {
      console.log(`[${new Date()}] Completed Cron Job for NHL Logging`);
      console.log('---------------------');
    })
    .catch((error) => {
      console.log(`[${new Date()}] Error Cron Job for NHL Logging`);
      console.error(error);
      console.log('---------------------');
    });
});

// Run at 08:30 AM every day.
cron.schedule('30 08 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for MLB Logging`);

  // Get all MLB players.
  getBaseball()
    .then(() => {
      console.log(`[${new Date()}] Completed Cron Job for MLB Logging`);
      console.log('---------------------');
    })
    .catch((error) => {
      console.log(`[${new Date()}] Error Cron Job for MLB Logging`);
      console.error(error);
      console.log('---------------------');
    });
});

// Run at 09:00 AM every day.
cron.schedule('00 09 * * *', function () {
  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NFL Logging`);

  // Get all NFL players.
  getFootball()
    .then(() => {
      console.log(`[${new Date()}] Completed Cron Job for NFL Logging`);
      console.log('---------------------');
    })
    .catch((error) => {
      console.log(`[${new Date()}] Error Cron Job for NFL Logging`);
      console.error(error);
      console.log('---------------------');
    });
});

const startUp = async () => {
  console.log('---------------------');
  console.log(`[${new Date()}] Starting cron job scheduler...`);
  console.log('---------------------');

  // Get all NHL players.
  await getHockey();

  // Get all MLB players.
  await getBaseball();

  // Get all NFL players.
  await getFootball();

  console.log('---------------------');
  console.log(`[${new Date()}] Completed startup...`);
  console.log('---------------------');
};

startUp();
