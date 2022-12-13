import { Prisma, Team } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';
import redis from '../lib/redis';

export async function deleteWTA() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Tennis',
    },
    update: {
      name: 'Tennis',
    },
    create: {
      name: 'Tennis',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const item = {
    id: 2,
    fullName: 'WTA Tour',
    city: '',
    abbreviation: 'WTA',
    shortName: 'WTA',
    league: 'wta',
    source: 'WTATennis.com',
    sport: 'Tennis',
  };

  try {
    const source = item.source;
    await prisma.team.deleteMany({
      where: {
        sport: {
          id: sport.id,
        },
        league: item.league,
        source: source,
      },
    });
  } catch (e) {
    console.log('Delete WTA Error');
    console.error(e);
  }

  return true;
}

export async function deleteATP() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Tennis',
    },
    update: {
      name: 'Tennis',
    },
    create: {
      name: 'Tennis',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const item = {
    id: 1,
    fullName: 'ATP Tour',
    city: '',
    abbreviation: 'ATP',
    shortName: 'ATP',
    league: 'atp',
    source: 'ATPtour.com',
    sport: 'Tennis',
  };

  try {
    const source = item.source;
    await prisma.team.deleteMany({
      where: {
        sport: {
          id: sport.id,
        },
        league: item.league,
        source: source,
      },
    });
  } catch (e) {
    console.log('Delete ATP Error');
    console.error(e);
  }

  return true;
}

export async function getWTA() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Tennis',
    },
    update: {
      name: 'Tennis',
    },
    create: {
      name: 'Tennis',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const item = {
    id: 2,
    fullName: 'WTA Tour',
    city: '',
    abbreviation: 'WTA',
    shortName: 'WTA',
    league: 'wta',
    source: 'WTATennis.com',
    sport: 'Tennis',
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
      `https://mobile-statsv2.sportsnet.ca/standings?league=wta&season=${new Date().getFullYear()}`
    )) as WTAResult;

    const roster = rosterResult.data.teams;
    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of roster) {
      try {
        if (!rosterItem?.first_name || !rosterItem.last_name) continue;

        const playerResult = (await fetchRequest(
          `https://api.wtatennis.com/tennis/players/?page=0&pageSize=1&name=${rosterItem.first_name.replace(
            /\W/g,
            ''
          )}%20${rosterItem.last_name.replace(/\W/g, '')}`
        )) as WTAPlayerResult;

        const person = playerResult.content[0];

        if (!person?.id || !person?.firstName || !person?.lastName) continue;

        const playerHeadshotResult = (await fetchRequest(
          `https://api.wtatennis.com/content/wta/photo/EN/?pageSize=1&tagNames=player-headshot&referenceExpression=TENNIS_PLAYER%3A${person.id}`
        )) as WTAPlayerHeadshotResult;

        const lastName = rosterItem.last_name;
        const firstName = rosterItem.first_name;

        players.push({
          identifier:
            `${rosterItem.id}-${item.sport}-${firstName}-${lastName}`.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          fullName: person.fullName,
          position: rosterItem.rank.toString(),
          number: rosterItem.points,
          headshotUrl: playerHeadshotResult.content[0]?.onDemandUrl
            ? `${playerHeadshotResult.content[0]?.onDemandUrl}?width=64&height=64`
            : playerHeadshotResult.content[0]?.imageUrl ?? rosterItem.flag_url,
          linkUrl:
            `https://www.wtatennis.com/players/${person.id}/${firstName}-${lastName}`.toLowerCase(),
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
    console.log('Tennis Error');
    console.error(e);
  }

  return true;
}

export default async function getATP() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Tennis',
    },
    update: {
      name: 'Tennis',
    },
    create: {
      name: 'Tennis',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const item = {
    id: 1,
    fullName: 'ATP Tour',
    city: '',
    abbreviation: 'ATP',
    shortName: 'ATP',
    league: 'atp',
    source: 'ATPtour.com',
    sport: 'Tennis',
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
      'https://mobile-statsv2.sportsnet.ca/standings?league=atp'
    )) as ATPResult;

    const roster = rosterResult.data.teams;
    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of roster) {
      try {
        const playerResult = (await fetchRequest(
          `https://www.atptour.com/en/-/ajax/PredictiveContentSearch/GetPlayerResults/${rosterItem.first_name.replace(
            /\W/g,
            ''
          )}%20${rosterItem.last_name.replace(/\W/g, '')}`
        )) as ATPPlayerResult;

        const person = playerResult.items[0];

        if (!person.FirstName || !person.LastName) continue;

        const lastName = rosterItem.last_name;
        const firstName = rosterItem.first_name;

        players.push({
          identifier:
            `${rosterItem.id}-${item.sport}-${firstName}-${lastName}`.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          fullName: `${person.FirstName} ${person.LastName}`,
          position: rosterItem.rank.toString(),
          number: rosterItem.points,
          headshotUrl:
            `https://www.atptour.com/${person.ImageUrl}` ?? rosterItem.flag_url,
          linkUrl: `https://www.atptour.com/${person.ProfileUrl}`,
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
    console.log('Tennis Error');
    console.error(e);
  }

  return true;
}
