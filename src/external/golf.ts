import { Prisma, Team } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

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
    console.log('Golf Error');
    console.error(e);
  }

  return true;
}
