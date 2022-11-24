import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export default async function getPremierLeague() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Soccer',
    },
    update: {
      name: 'Soccer',
    },
    create: {
      name: 'Soccer',
    },
  });

  const teamResult = (await fetchRequest(
    `http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams`
  )) as EPLResult;

  await prisma.team.deleteMany({
    where: {
      sport: {
        id: sport.id,
      },
      source: 'ESPN.com',
    },
  });

  const deletedTeams = [] as string[];
  const league = teamResult.sports[0].leagues[0];
  for (const t of league.teams) {
    try {
      const source = 'ESPN.com';
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
          abbreviation: item.abbreviation,
          shortName: item.shortDisplayName,
          league: league.name,
          source: 'ESPN.com',
          sportId: sport.id,
        },
      });

      const rosterResult = (await fetchRequest(
        `http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/${item.id}/roster`
      )) as NFLRosterResult;

      if (!rosterResult.athletes || rosterResult.athletes.length <= 0) continue;

      const players = [] as Prisma.PlayerCreateManyInput[];
      for (const athlete of rosterResult.athletes) {
        const pos = athlete.position;
        for (const person of athlete.items) {
          const position = person.position ?? {
            abbreviation: pos,
            name: pos,
            displayName: pos,
            id: '-1',
          };
          const lastName = person.lastName;
          const firstName = person.firstName;
          const playerIdentifier =
            `${person.id}-${league.name}-${person.slug}`.toLowerCase();

          if (!position.displayName) continue;

          players.push({
            identifier: playerIdentifier,
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`,
            position: position.displayName,
            number: parseInt(person.jersey || '-1'),
            headshotUrl: `https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${item.id}.png&w=67&h=67`,
            linkUrl: `https://www.espn.com/soccer/player/_/id/${person.id}/${person.slug}`,
            source: 'ESPN.com',
            teamId: createdTeam.id,
            sportId: sport.id,
          });
        }
      }

      console.info(createdTeam.fullName, players.length);
      await prisma.player.createMany({
        data: players,
        skipDuplicates: true,
      });
    } catch (e) {
      console.log('EPL Error');
      console.error(e);
    }
  }

  return true;
}
