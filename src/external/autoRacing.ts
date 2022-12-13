import { Prisma, Team } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';
import redis from '../lib/redis';

export async function getIndyCar() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'AutoRacing',
    },
    update: {
      name: 'AutoRacing',
    },
    create: {
      name: 'AutoRacing',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const item = {
    id: 1,
    fullName: 'IndyCar Tour',
    city: '',
    abbreviation: 'IndyCar',
    shortName: 'IndyCar',
    league: 'irl',
    source: 'indycar.com',
    sport: 'AutoRacing',
  };
  try {
    const source = item.source;
    const teamIdentifier =
      `${item.id}-${item.league}-${item.fullName}`.toLowerCase();

    await prisma.team.deleteMany({
      where: {
        sport: {
          id: sport.id,
        },
        league: item.league,
        source: source,
      },
    });

    const createdTeam = await prisma.team.create({
      data: {
        identifier: teamIdentifier,
        fullName: item.fullName,
        city: item.city,
        abbreviation: item.abbreviation,
        shortName: item.shortName,
        league: item.league,
        source: source,
        sportId: sport.id,
      },
    });

    const rosterResult = (await fetchRequest(
      `https://mobile-statsv2.sportsnet.ca/standings?league=irl&season=${new Date().getFullYear()}`
    )) as AutoRacingResult;

    const roster = rosterResult.data.teams;
    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of roster) {
      try {
        if (!rosterItem.first_name || !rosterItem.last_name) continue;

        const firstName = rosterItem.first_name
          .replace('Jr.', '')
          .replace('jr.', '')
          .replace("'", '')
          .replace(/\W/g, '');

        const lastName = rosterItem.last_name
          .replace('Jr.', '')
          .replace('jr.', '')
          .replace("'", '')
          .replace(/\W/g, '');

        const playerSlug = `${firstName}-${lastName}`.toLowerCase();

        players.push({
          identifier:
            `${rosterItem.id}-${item.league}-${playerSlug}`.toLowerCase(),
          firstName: rosterItem.first_name,
          lastName: rosterItem.last_name,
          fullName: `${rosterItem.first_name} ${rosterItem.last_name}`,
          position: rosterItem.rank.toString(),
          number: rosterItem.points,
          headshotUrl: `https://digbza2f4g9qo.cloudfront.net/-/media/IndyCar/Drivers/IndyCar-Series/Driver-List/${firstName}${lastName}.png?h=64&iar=1&w=64`,
          linkUrl: `https://www.indycar.com/Series/IndyCar-Series/${playerSlug}`,
          source: source,
          teamId: createdTeam.id,
          sportId: sport.id,
        });
      } catch {}
    }

    await prisma.player.createMany({
      data: players,
      skipDuplicates: true,
    });
    console.info(createdTeam.fullName, players.length);
  } catch (e) {
    console.log('IndyCar Error');
    console.error(e);
  }

  return true;
}

export async function getNASCAR() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'AutoRacing',
    },
    update: {
      name: 'AutoRacing',
    },
    create: {
      name: 'AutoRacing',
    },
  });

  const item = {
    id: 1,
    fullName: 'NASCAR',
    city: '',
    abbreviation: 'NASCAR',
    shortName: 'NASCAR',
    league: 'nascar',
    source: 'NASCAR.com',
    sport: 'AutoRacing',
  };
  try {
    const source = item.source;
    const teamIdentifier =
      `${item.id}-${item.sport}-${item.fullName}`.toLowerCase();

    await prisma.team.deleteMany({
      where: {
        sport: {
          id: sport.id,
        },
        league: item.league,
        source: source,
      },
    });

    const createdTeam = await prisma.team.create({
      data: {
        identifier: teamIdentifier,
        fullName: item.fullName,
        city: item.city,
        abbreviation: item.abbreviation,
        shortName: item.shortName,
        league: item.league,
        source: source,
        sportId: sport.id,
      },
    });

    const nascarRosterResult = (await fetchRequest(
      `https://cf.nascar.com/cacher/drivers.json`
    )) as NascarResult;

    const drivers = nascarRosterResult.response;

    const rosterResult = (await fetchRequest(
      `https://mobile-statsv2.sportsnet.ca/standings?league=nascar&season=${new Date().getFullYear()}`
    )) as AutoRacingResult;

    const roster = rosterResult.data.teams;
    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of roster) {
      try {
        const firstName = rosterItem.first_name
          .replace('Jr.', '')
          .replace('jr.', '')
          .replace("'", '')
          .replace(/\W/g, '');

        const lastName = rosterItem.last_name
          .replace('Jr.', '')
          .replace('jr.', '')
          .replace("'", '')
          .replace(/\W/g, '');

        const playerSlug = `${firstName}-${lastName}`.toLowerCase();

        const driver =
          drivers.find(
            (d) =>
              d.First_Name === rosterItem.first_name &&
              d.Last_Name === rosterItem.last_name
          ) ?? ({} as NascarRosterResult);

        players.push({
          identifier:
            `${rosterItem.id}-${item.league}-${playerSlug}`.toLowerCase(),
          firstName: rosterItem.first_name,
          lastName: rosterItem.last_name,
          fullName: `${rosterItem.first_name} ${rosterItem.last_name}`,
          position: rosterItem.rank.toString(),
          number: rosterItem.points,
          headshotUrl:
            driver.Image ??
            driver.Image_Transparent ??
            `https://www.nascar.com/wp-content/uploads/sites/7/2022/01/28/1_2022_${firstName}_${lastName}_550x440.png`,
          linkUrl:
            driver.Driver_Page ??
            `https://www.nascar.com/drivers//${playerSlug}.html`,
          source: source,
          teamId: createdTeam.id,
          sportId: sport.id,
        });
      } catch {}
    }

    await prisma.player.createMany({
      data: players,
      skipDuplicates: true,
    });
    console.info(createdTeam.fullName, players.length);
  } catch (e) {
    console.log('Formula1 Error');
    console.error(e);
  }

  return true;
}

export default async function getFormula1() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'AutoRacing',
    },
    update: {
      name: 'AutoRacing',
    },
    create: {
      name: 'AutoRacing',
    },
  });

  const item = {
    id: 1,
    fullName: 'Formula1',
    city: '',
    abbreviation: 'Formula1',
    shortName: 'Formula1',
    league: 'f1',
    source: 'formula1.com',
    sport: 'AutoRacing',
  };
  try {
    const source = item.source;
    const teamIdentifier =
      `${item.id}-${item.sport}-${item.fullName}`.toLowerCase();

    await prisma.team.deleteMany({
      where: {
        sport: {
          id: sport.id,
        },
        league: item.league,
        source: source,
      },
    });

    const createdTeam = await prisma.team.create({
      data: {
        identifier: teamIdentifier,
        fullName: item.fullName,
        city: item.city,
        abbreviation: item.abbreviation,
        shortName: item.shortName,
        league: item.league,
        source: source,
        sportId: sport.id,
      },
    });

    const rosterResult = (await fetchRequest(
      `https://mobile-statsv2.sportsnet.ca/standings?league=form1&season=${new Date().getFullYear()}`
    )) as AutoRacingResult;

    const roster = rosterResult.data.teams;
    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of roster) {
      try {
        if (!rosterItem.first_name || !rosterItem.last_name) continue;

        const firstName = rosterItem.first_name
          .replace('Jr.', '')
          .replace('jr.', '')
          .replace("'", '')
          .replace(/\W/g, '');

        const lastName = rosterItem.last_name
          .replace('Jr.', '')
          .replace('jr.', '')
          .replace("'", '')
          .replace(/\W/g, '');

        const playerSlug = `${firstName}-${lastName}`.toLowerCase();

        players.push({
          identifier:
            `${rosterItem.id}-${item.league}-${playerSlug}`.toLowerCase(),
          firstName: rosterItem.first_name,
          lastName: rosterItem.last_name,
          fullName: `${rosterItem.first_name} ${rosterItem.last_name}`,
          position: rosterItem.rank.toString(),
          number: rosterItem.points,
          headshotUrl: `https://www.formula1.com/content/fom-website/en/drivers/${playerSlug}/jcr:content/image.img.2048.medium.jpg`,
          linkUrl: `https://www.formula1.com/en/drivers/${playerSlug}.html`,
          source: source,
          teamId: createdTeam.id,
          sportId: sport.id,
        });
      } catch {}
    }

    await prisma.player.createMany({
      data: players,
      skipDuplicates: true,
    });
    console.info(createdTeam.fullName, players.length);
  } catch (e) {
    console.log('Formula1 Error');
    console.error(e);
  }

  return true;
}
