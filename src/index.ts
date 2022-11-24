import * as cron from 'node-cron';

import prisma from './lib/prisma';
import getHockey from './external/hockey';
import getBaseball from './external/baseball';
import getFootball from './external/football';
import getBasketball, { getWNBA } from './external/basketball';
import getMLS from './external/mls';
import getESPNSoccer from './external/espnSoccer';

let hasStarted = false;
const timeZone = 'America/Toronto';

process.on('SIGTERM', async () => {
  try {
    await prisma.$disconnect();
  } catch {}

  console.log('---------------------');
  console.log(`[${new Date()}] Ended cron job scheduler...`);
  console.log('---------------------');
});

// Run at 11:00 every day.
cron.schedule(
  '00 11 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for NHL Logging`);

    // Get all NHL players.
    await getHockey();

    console.log(`[${new Date()}] Completed Cron Job for NHL Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 11:15 every day.
cron.schedule(
  '15 11 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for MLB Logging`);

    // Get all MLB players.
    await getBaseball();

    console.log(`[${new Date()}] Completed Cron Job for MLB Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 11:30 every day.
cron.schedule(
  '30 11 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for NFL Logging`);

    // Get all NFL players.
    await getFootball();

    console.log(`[${new Date()}] Completed Cron Job for NFL Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 11:45 every day.
cron.schedule(
  '45 11 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for NBA Logging`);

    // Get all NBA players.
    await getBasketball();

    console.log(`[${new Date()}] Completed Cron Job for NBA Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 12:00 every day.
cron.schedule(
  '00 12 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for NBA Logging`);

    // Get all WNBA players.
    await getWNBA();

    console.log(`[${new Date()}] Completed Cron Job for NBA Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 12:15 every day.
cron.schedule(
  '15 12 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for MLS Logging`);

    // Get all MLS players.
    await getMLS();

    console.log(`[${new Date()}] Completed Cron Job for MLS Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 12:30 every day.
cron.schedule(
  '30 12 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running UEFA Champions League Logging`);

    // Get all UEFA Champions League players.
    await getESPNSoccer('uefa.champions', 'UEFA Champions League');

    console.log(`[${new Date()}] Completed UEFA Champions League Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 12:45 every day.
cron.schedule(
  '45 12 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running English Premier League Logging`);

    // Get all Premier League players.
    await getESPNSoccer('eng.1', 'English Premier League');

    console.log(`[${new Date()}] Completed English Premier League Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 13:00 every day.
cron.schedule(
  '00 13 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(
      `[${new Date()}] Running Cron Job for German Bundesliga Logging`
    );

    // Get all German Bundesliga players.
    await getESPNSoccer('ger.1', 'German Bundesliga');

    console.log(
      `[${new Date()}] Completed Cron Job for German Bundesliga Logging`
    );
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 13:15 every day.
cron.schedule(
  '15 13 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for Spanish LaLiga Logging`);

    // Get all Spanish LaLiga players.
    await getESPNSoccer('esp.1', 'Spanish LaLiga');

    console.log(
      `[${new Date()}] Completed Cron Job for Spanish LaLiga Logging`
    );
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 13:30 every day.
cron.schedule(
  '30 13 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Mexican Liga MX Logging`);

    // Get all Mexican Liga MX players.
    await getESPNSoccer('mex.1', 'Mexican Liga MX');

    console.log(`[${new Date()}] Completed Mexican Liga MX Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

const startUp = async () => {
  hasStarted = false;
  console.log('---------------------');
  console.log(`[${new Date()}] Starting cron job scheduler...`);
  console.log('---------------------');

  /** */
  // Get all NHL players.
  console.log(`[${new Date()}] Running NHL Logging`);
  await getHockey();
  console.log(`[${new Date()}] Completed NHL Logging`);
  /**/

  /** */
  // Get all MLB players.
  console.log(`[${new Date()}] Running MLB Logging`);
  await getBaseball();
  console.log(`[${new Date()}] Completed MLB Logging`);
  /**/

  /** */
  // Get all NFL players.
  console.log(`[${new Date()}] Running NFL Logging`);
  await getFootball();
  console.log(`[${new Date()}] Completed NFL Logging`);
  /**/

  /** */
  // Get all NBA players.
  console.log(`[${new Date()}] Running NBA Logging`);
  await getBasketball();
  console.log(`[${new Date()}] Completed NBA Logging`);
  /**/

  /** */
  // Get all WNBA players.
  console.log(`[${new Date()}] Running WNBA Logging`);
  await getWNBA();
  console.log(`[${new Date()}] Completed WNBA Logging`);
  /**/

  /** */
  // Get all MLS players.
  console.log(`[${new Date()}] Running MLS Logging`);
  await getMLS();
  console.log(`[${new Date()}] Completed MLS Logging`);
  /**/

  /** */
  // Get all UEFA Champions League players.
  console.log(`[${new Date()}] Running UEFA Champions League Logging`);
  await getESPNSoccer('uefa.champions', 'UEFA Champions League');
  console.log(`[${new Date()}] Completed UEFA Champions League Logging`);
  /**/

  /** */
  // Get all Premier League players.
  console.log(`[${new Date()}] Running English Premier League Logging`);
  await getESPNSoccer('eng.1', 'English Premier League');
  console.log(`[${new Date()}] Completed English Premier League Logging`);
  /**/

  /** */
  // Get all German Bundesliga players.
  console.log(`[${new Date()}] Running German Bundesliga Logging`);
  await getESPNSoccer('ger.1', 'German Bundesliga');
  console.log(`[${new Date()}] Completed German Bundesliga Logging`);
  /**/

  /** */
  // Get all Spanish LaLiga players.
  console.log(`[${new Date()}] Running Spanish LaLiga Logging`);
  await getESPNSoccer('esp.1', 'Spanish LaLiga');
  console.log(`[${new Date()}] Completed Spanish LaLiga Logging`);
  /**/

  /** */
  // Get all Mexican Liga MX players.
  console.log(`[${new Date()}] Running Mexican Liga MX Logging`);
  await getESPNSoccer('mex.1', 'Mexican Liga MX');
  console.log(`[${new Date()}] Completed Mexican Liga MX Logging`);
  /**/

  console.log('---------------------');
  console.log(`[${new Date()}] Completed startup...`);
  console.log('---------------------');
  hasStarted = true;
};

startUp();
