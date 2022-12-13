import { Prisma, Team } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';
import redis from '../lib/redis';

export default async function getCFL() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Football',
    },
    update: {
      name: 'Football',
    },
    create: {
      name: 'Football',
    },
  });

  if (sport) {
    await redis.del(`sportCache:${sport.name.toLowerCase()}`);
    await redis.del(`teamCache:${sport.name.toLowerCase()}`);
    await redis.del(`playerCache:${sport.name.toLowerCase()}`);
  }

  const teamResult = (await fetchRequest(
    `https://site.api.espn.com/apis/site/v2/sports/football/cfl/teams`
  )) as CFLResult;

  const deletedTeams = [] as string[];
  const teams = [] as Team[];
  const league = teamResult.sports[0].leagues[0];
  const source = 'ESPN.com';
  for (const t of league.teams) {
    try {
      const item = t.team;
      const teamIdentifier =
        `${item.id}-${league.name}-${item.slug}`.toLowerCase();

      if (
        !item.displayName ||
        !item.location ||
        !item.abbreviation ||
        !item.shortDisplayName
      )
        continue;

      let abbreviation = item.abbreviation;
      switch (abbreviation) {
        case 'MTA':
          abbreviation = 'MTL';
          break;
        case 'HTC':
          abbreviation = 'HAM';
          break;
        case 'ORB':
          abbreviation = 'OTT';
          break;
        case 'CSP':
          abbreviation = 'CGY';
          break;
        case 'EES':
          abbreviation = 'EDM';
          break;
        case 'SRR':
          abbreviation = 'SSK';
          break;
        case 'WBB':
          abbreviation = 'WPG';
          break;
        case 'BCL':
          abbreviation = 'BC';
          break;
        default:
          abbreviation = item.abbreviation;
          break;
      }

      if (
        !deletedTeams.find(
          (dt) => dt === `${source}-${league.name.toLowerCase()}`
        )
      ) {
        await prisma.team.deleteMany({
          where: {
            sport: {
              id: sport.id,
            },
            league: league.name,
            source: source,
          },
        });
        deletedTeams.push(`${source}-${league.name.toLowerCase()}`);
      }

      const createdTeam = await prisma.team.create({
        data: {
          identifier: teamIdentifier,
          fullName: item.displayName,
          city: item.location,
          abbreviation: abbreviation,
          shortName: item.shortDisplayName,
          league: league.name,
          source: source,
          sportId: sport.id,
        },
      });
      teams.push(createdTeam);
      console.info(createdTeam.fullName);
    } catch (e) {
      console.log('CFL Error');
      console.error(e);
      return true;
    }
  }

  try {
    const rosterResult = (await fetchRequest(
      `https://www.cfl.ca/wp-content/themes/cfl.ca/inc/admin-ajax.php?action=get_all_players`
    )) as CFLRosterResult;

    if (!rosterResult?.data || rosterResult?.data?.length <= 0) return true;

    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of rosterResult.data) {
      try {
        if (
          rosterItem[0] === '' ||
          rosterItem[1] === '' ||
          rosterItem[2] === '' ||
          rosterItem[7] <= 0 ||
          rosterItem[8] === '' ||
          rosterItem[9] === ''
        )
          continue;

        const playerId = rosterItem[9].split('/')[2]?.replace('/', '') ?? '';
        const team = teams.find((t) => t.abbreviation === rosterItem[2]);
        if (!team) continue;

        const position = rosterItem[3];
        const lastName = rosterItem[1].split(',')[0] ?? '';
        const firstName = rosterItem[1].split(',')[1]?.trim() ?? '';

        if (playerId === '' || firstName === '' || lastName === '') continue;

        players.push({
          identifier:
            `${playerId}-${league.name}-${firstName}-${lastName}`.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          fullName: `${firstName} ${lastName}`,
          position: position,
          number: -1,
          headshotUrl:
            'https://www.cfl.ca/wp-content/plugins/cfl-stats/images/player-silhouette.png',
          linkUrl: `https://www.cfl.ca${rosterItem[9]}`,
          source: source,
          teamId: team.id,
          sportId: sport.id,
        });
      } catch (e) {
        console.log('CFL Error');
        console.error(e);
      }
    }

    await prisma.player.createMany({
      data: players,
      skipDuplicates: true,
    });
    console.info(players.length);
  } catch (e) {
    console.log('CFL Error');
    console.error(e);
  }

  return true;
}
