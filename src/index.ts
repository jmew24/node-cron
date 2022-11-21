import * as cron from 'node-cron';

import prisma from './lib/prisma';
import getHockey from './external/hockey';
import getBaseball from './external/baseball';
import getFootball from './external/football';
import getBasketball from './external/basketball';

let hasStarted = false;

process.on('SIGTERM', async () => {
  try {
    await prisma.$disconnect();
  } catch {}

  console.log('---------------------');
  console.log(`[${new Date()}] Ended cron job scheduler...`);
  console.log('---------------------');
});

// Run at 11:00 every day.
cron.schedule('00 11 * * *', async () => {
  if (!hasStarted) return;

  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NHL Logging`);

  // Get all NHL players.
  await getHockey();

  console.log(`[${new Date()}] Completed Cron Job for NHL Logging`);
  console.log('---------------------');
});

// Run at 11:15 every day.
cron.schedule('15 11 * * *', async () => {
  if (!hasStarted) return;

  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for MLB Logging`);

  // Get all MLB players.
  await getBaseball();

  console.log(`[${new Date()}] Completed Cron Job for MLB Logging`);
  console.log('---------------------');
});

// Run at 11:30 every day.
cron.schedule('30 11 * * *', async () => {
  if (!hasStarted) return;

  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NFL Logging`);

  // Get all NFL players.
  await getFootball();

  console.log(`[${new Date()}] Completed Cron Job for NFL Logging`);
  console.log('---------------------');
});

// Run at 11:45 every day.
cron.schedule('45 11 * * *', async () => {
  if (!hasStarted) return;

  console.log('---------------------');
  console.log(`[${new Date()}] Running Cron Job for NBA Logging`);

  // Get all NFL players.
  await getBasketball();

  console.log(`[${new Date()}] Completed Cron Job for NBA Logging`);
  console.log('---------------------');
});

const startUp = async () => {
  hasStarted = false;
  console.log('---------------------');
  console.log(`[${new Date()}] Starting cron job scheduler...`);
  console.log('---------------------');

  // Get all NHL players.
  console.log(`[${new Date()}] Running NHL Logging`);
  await getHockey();
  console.log(`[${new Date()}] Completed NHL Logging`);

  // Get all MLB players.
  console.log(`[${new Date()}] Running MLB Logging`);
  await getBaseball();
  console.log(`[${new Date()}] Completed MLB Logging`);

  // Get all NFL players.
  console.log(`[${new Date()}] Running NFL Logging`);
  await getFootball();
  console.log(`[${new Date()}] Completed NFL Logging`);

  // Get all NBA players.
  console.log(`[${new Date()}] Running NBA Logging`);
  await getBasketball();
  console.log(`[${new Date()}] Completed NBA Logging`);

  console.log('---------------------');
  console.log(`[${new Date()}] Completed startup...`);
  console.log('---------------------');
  hasStarted = true;
};

startUp();
