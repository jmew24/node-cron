import prisma from './lib/prisma';
import getHockey from './external/hockey';
import getBaseball from './external/baseball';
import getFootball from './external/football';
import getCFL from './external/cfl';
import getBasketball, { getWNBA } from './external/basketball';
import getMLS from './external/mls';
import getESPNSoccer from './external/espnSoccer';
import getATP, { getWTA } from './external/tennis';
import getFormula1, { getIndyCar, getNASCAR } from './external/autoRacing';
import getPGA, { getLPGA } from './external/golf';

process.on('SIGTERM', async () => {
  try {
    await prisma.$disconnect();
  } catch {}

  console.log('---------------------');
  console.log(`[${new Date()}] Ended cron job scheduler...`);
  console.log('---------------------');
});

const Dev = async () => {
  console.log('---------------------');
  console.log(`[${new Date()}] Starting cron job scheduler...`);
  console.log('---------------------');

  /**
  // Get all NHL players.
  console.log(`[${new Date()}] Running NHL Logging`);
  await getHockey();
  console.log(`[${new Date()}] Completed NHL Logging`);
  /**/

  /**
  // Get all MLB players.
  console.log(`[${new Date()}] Running MLB Logging`);
  await getBaseball();
  console.log(`[${new Date()}] Completed MLB Logging`);
  /**/

  /**
  // Get all NFL players.
  console.log(`[${new Date()}] Running NFL Logging`);
  await getFootball();
  console.log(`[${new Date()}] Completed NFL Logging`);
  /**/

  /**
  // Get all CFL players.
  console.log(`[${new Date()}] Running CFL Logging`);
  await getCFL();
  console.log(`[${new Date()}] Completed CFL Logging`);
  /**/

  /**
  // Get all NBA players.
  console.log(`[${new Date()}] Running NBA Logging`);
  await getBasketball();
  console.log(`[${new Date()}] Completed NBA Logging`);
  /**/

  /**
  // Get all WNBA players.
  console.log(`[${new Date()}] Running WNBA Logging`);
  await getWNBA();
  console.log(`[${new Date()}] Completed WNBA Logging`);
  /**/

  /**
  // Get all MLS players.
  console.log(`[${new Date()}] Running MLS Logging`);
  await getMLS();
  console.log(`[${new Date()}] Completed MLS Logging`);
  /**/

  /**
  // Get all Premier League players.
  console.log(`[${new Date()}] Running English Premier League Logging`);
  await getESPNSoccer('eng.1', 'English Premier League');
  console.log(`[${new Date()}] Completed English Premier League Logging`);
  /**/

  /**
  // Get all German Bundesliga players.
  console.log(`[${new Date()}] Running German Bundesliga Logging`);
  await getESPNSoccer('ger.1', 'German Bundesliga');
  console.log(`[${new Date()}] Completed German Bundesliga Logging`);
  /**/

  /**
  // Get all Spanish LaLiga players.
  console.log(`[${new Date()}] Running Spanish LaLiga Logging`);
  await getESPNSoccer('esp.1', 'Spanish LaLiga');
  console.log(`[${new Date()}] Completed Spanish LaLiga Logging`);
  /**/

  /**
  // Get all Mexican Liga MX players.
  console.log(`[${new Date()}] Running Mexican Liga MX Logging`);
  await getESPNSoccer('mex.1', 'Mexican Liga MX');
  console.log(`[${new Date()}] Completed Mexican Liga MX Logging`);
  /**/

  /**
  //Get all ATP players.
  console.log(`[${new Date()}] Running ATP Logging`);
  await getATP();
  console.log(`[${new Date()}] Completed ATP Logging`);
  /**/

  /**
  //Get all WTA players.
  console.log(`[${new Date()}] Running WTA Logging`);
  await getWTA();
  console.log(`[${new Date()}] Completed WTA Logging`);
  /**/

  /**
  //Get all Formula1 players.
  console.log(`[${new Date()}] Running Formula1 Logging`);
  await getFormula1();
  console.log(`[${new Date()}] Completed Formula1 Logging`);
  /**/

  /**
  //Get all IndyCar players.
  console.log(`[${new Date()}] Running IndyCar Logging`);
  await getIndyCar();
  console.log(`[${new Date()}] Completed IndyCar Logging`);
  /**/

  /**
  //Get all PGA players.
  console.log(`[${new Date()}] Running PGA Logging`);
  await getPGA();
  console.log(`[${new Date()}] Completed PGA Logging`);
  /**/

  /** */
  //Get all NASCAR players.
  console.log(`[${new Date()}] Running NASCAR Logging`);
  await getNASCAR();
  console.log(`[${new Date()}] Completed NASCAR Logging`);
  /**/

  /**
  //Get all LPGA players.
  console.log(`[${new Date()}] Running LPGA Logging`);
  await getLPGA();
  console.log(`[${new Date()}] Completed LPGA Logging`);
  /**/

  console.log('---------------------');
  console.log(`[${new Date()}] Completed startup...`);
  console.log('---------------------');
};

export default Dev;
