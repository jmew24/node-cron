import * as cron from 'node-cron';

import prisma from './lib/prisma';
import getHockey from './external/hockey';
import getBaseball from './external/baseball';
import getFootball from './external/football';
import getCFL from './external/cfl';
import getBasketball, { getWNBA } from './external/basketball';
import getMLS from './external/mls';
import getESPNSoccer from './external/espnSoccer';
import getATP, { getWTA } from './external/tennis';
import getFormula1, { getIndyCar } from './external/autoRacing';
import getPGA, { getLPGA } from './external/golf';

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

// Run at 9:00 every day.
cron.schedule(
  '00 9 * * *',
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

// Run at 9:15 every day.
cron.schedule(
  '15 9 * * *',
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

// Run at 9:30 every day.
cron.schedule(
  '30 9 * * *',
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

// Run at 9:45 every day.
cron.schedule(
  '45 9 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running Cron Job for CFL Logging`);

    // Get all CFL players.
    await getCFL();

    console.log(`[${new Date()}] Completed Cron Job for CFL Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

// Run at 10:00 every day.
cron.schedule(
  '00 10 * * *',
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

// Run at 10:15 every day.
cron.schedule(
  '15 10 * * *',
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

// Run at 10:30 every day.
cron.schedule(
  '30 10 * * *',
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

// Run at 10:45 every day.
cron.schedule(
  '45 10 * * *',
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

// Run at 11:00 every day.
cron.schedule(
  '00 11 * * *',
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

// Run at 11:15 every day.
cron.schedule(
  '15 11 * * *',
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

// Run at 11:30 every day.
cron.schedule(
  '30 11 * * *',
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

// Run at 11:45 every day.
cron.schedule(
  '45 11 * * *',
  async () => {
    if (!hasStarted) return;

    console.log('---------------------');
    console.log(`[${new Date()}] Running ATP Logging`);

    // Get all ATP players.
    await getATP();

    console.log(`[${new Date()}] Completed ATP Logging`);
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
    console.log(`[${new Date()}] Running WTA Logging`);

    // Get all WTA players.
    await getWTA();

    console.log(`[${new Date()}] Completed WTA Logging`);
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
    console.log(`[${new Date()}] Running Formula1 Logging`);

    // Get all Formula1 players.
    await getFormula1();

    console.log(`[${new Date()}] Completed Formula1 Logging`);
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
    console.log(`[${new Date()}] Running IndyCar Logging`);

    // Get all IndyCar players.
    await getIndyCar();

    console.log(`[${new Date()}] Completed IndyCar Logging`);
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
    console.log(`[${new Date()}] Running PGA Logging`);

    // Get all PGA players.
    await getPGA();

    console.log(`[${new Date()}] Completed PGA Logging`);
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
    console.log(`[${new Date()}] Running LPGA Logging`);

    // Get all LPGA players.
    await getLPGA();

    console.log(`[${new Date()}] Completed LPGA Logging`);
    console.log('---------------------');
  },
  { timezone: timeZone }
);

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

  // Get all CFL players.
  console.log(`[${new Date()}] Running CFL Logging`);
  await getCFL();
  console.log(`[${new Date()}] Completed CFL Logging`);

  // Get all NBA players.
  console.log(`[${new Date()}] Running NBA Logging`);
  await getBasketball();
  console.log(`[${new Date()}] Completed NBA Logging`);

  // Get all WNBA players.
  console.log(`[${new Date()}] Running WNBA Logging`);
  await getWNBA();
  console.log(`[${new Date()}] Completed WNBA Logging`);

  // Get all MLS players.
  console.log(`[${new Date()}] Running MLS Logging`);
  await getMLS();
  console.log(`[${new Date()}] Completed MLS Logging`);

  // Get all Premier League players.
  console.log(`[${new Date()}] Running English Premier League Logging`);
  await getESPNSoccer('eng.1', 'English Premier League');
  console.log(`[${new Date()}] Completed English Premier League Logging`);

  // Get all German Bundesliga players.
  console.log(`[${new Date()}] Running German Bundesliga Logging`);
  await getESPNSoccer('ger.1', 'German Bundesliga');
  console.log(`[${new Date()}] Completed German Bundesliga Logging`);

  // Get all Spanish LaLiga players.
  console.log(`[${new Date()}] Running Spanish LaLiga Logging`);
  await getESPNSoccer('esp.1', 'Spanish LaLiga');
  console.log(`[${new Date()}] Completed Spanish LaLiga Logging`);

  // Get all Mexican Liga MX players.
  console.log(`[${new Date()}] Running Mexican Liga MX Logging`);
  await getESPNSoccer('mex.1', 'Mexican Liga MX');
  console.log(`[${new Date()}] Completed Mexican Liga MX Logging`);

  //Get all ATP players.
  console.log(`[${new Date()}] Running ATP Logging`);
  await getATP();
  console.log(`[${new Date()}] Completed ATP Logging`);

  //Get all WTA players.
  console.log(`[${new Date()}] Running WTA Logging`);
  await getWTA();
  console.log(`[${new Date()}] Completed WTA Logging`);

  //Get all Formula1 players.
  console.log(`[${new Date()}] Running Formula1 Logging`);
  await getFormula1();
  console.log(`[${new Date()}] Completed Formula1 Logging`);

  //Get all IndyCar players.
  console.log(`[${new Date()}] Running IndyCar Logging`);
  await getIndyCar();
  console.log(`[${new Date()}] Completed IndyCar Logging`);

  //Get all PGA players.
  console.log(`[${new Date()}] Running PGA Logging`);
  await getPGA();
  console.log(`[${new Date()}] Completed PGA Logging`);

  //Get all LPGA players.
  console.log(`[${new Date()}] Running LPGA Logging`);
  await getLPGA();
  console.log(`[${new Date()}] Completed LPGA Logging`);

  console.log('---------------------');
  console.log(`[${new Date()}] Completed startup...`);
  console.log('---------------------');
  hasStarted = true;
};

startUp();

/**
import Dev from './dev';
Dev();
/**/
