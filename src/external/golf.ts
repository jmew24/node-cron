import { Prisma, Team } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';
import redis from '../lib/redis';

export async function getLPGA() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Golf',
    },
    update: {
      name: 'Golf',
    },
    create: {
      name: 'Golf',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const item = {
    id: 1,
    fullName: 'LPGA Tour',
    city: '',
    abbreviation: 'LPGA',
    shortName: 'LPGA',
    league: 'lpga',
    source: 'LPGA.com',
    sport: 'Golf',
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
      `https://mobile-statsv2.sportsnet.ca/standings.json?league=lpga&season=${new Date().getFullYear()}`
    )) as LPGAResult;

    if (rosterResult.status !== 'success') return true;

    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of rosterResult.data.teams) {
      try {
        if (!rosterItem.first_name || !rosterItem.last_name) continue;

        const fullName = `${rosterItem.first_name} ${rosterItem.last_name}`;
        const flagCountry = rosterItem.flag_url
          .replace(
            'https://images.rogersdigitalmedia.com/www.sportsnet.ca/team_logos/90x90/countries/',
            ''
          )
          .replace('.png', '')
          .trim();
        const country = `${flagCountry
          .replaceAll('_', ' ')
          .replaceAll('-', ' ')
          .trim()
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}`;

        const rosterStats =
          rosterItem.stats.find((stat) => stat.category === 'money') ??
          rosterItem.stats[0];

        players.push({
          identifier: `${rosterItem.id}-${item.sport}-${fullName
            .trim()
            .replace(' ', '-')}`.toLowerCase(),
          firstName: rosterItem.first_name,
          lastName: rosterItem.last_name,
          fullName: fullName,
          position: country,
          number: rosterStats.value > 0 ? 1 : 0,
          headshotUrl: rosterItem.flag_url,
          linkUrl:
            `https://www.lpga.com/search-results?search=${rosterItem.first_name}% ${rosterItem.last_name}`
              .trim()
              .replaceAll(' ', '%20'),
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
    console.log('LPGA Error');
    console.error(e);
  }

  return true;
}

export default async function getPGA() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Golf',
    },
    update: {
      name: 'Golf',
    },
    create: {
      name: 'Golf',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const item = {
    id: 1,
    fullName: 'PGA Tour',
    city: '',
    abbreviation: 'PGA',
    shortName: 'PGA',
    league: 'pga',
    source: 'PGATour.com',
    sport: 'Golf',
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
      'https://www.pgatour.com/players/jcr:content/mainParsys/players_directory.players.json'
    )) as PGAResult;

    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of rosterResult.players) {
      try {
        if (!rosterItem.first_name || !rosterItem.last_name) continue;

        players.push({
          identifier:
            `${rosterItem.id}-${item.sport}-${rosterItem.urlName}`.toLowerCase(),
          firstName: rosterItem.first_name,
          lastName: rosterItem.last_name,
          fullName: rosterItem.name,
          position: rosterItem.countryName.toString(),
          number: rosterItem.active ? 1 : 0,
          headshotUrl: `https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_2.0,f_auto,g_face:center,h_64,q_auto,w_64/headshots_${rosterItem.id}.png`,
          linkUrl: `https://www.pgatour.com/players/player.${rosterItem.id}.${rosterItem.urlName}.html`,
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
    console.log('PGA Error');
    console.error(e);
  }

  return true;
}
