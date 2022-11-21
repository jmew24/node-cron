import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export default async function getFootball() {
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

  const teamResult = (await fetchRequest(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
  )) as NFLResult;

  await prisma.team.deleteMany({
    where: {
      sport: {
        id: sport.id,
      },
      source: 'ESPN.com',
    },
  });

  const league = teamResult.sports[0].leagues[0];
  for (const t of league.teams) {
    try {
      const item = t.team;
      const teamIdentifier =
        `${item.id}-${league.name}-${item.slug}`.toLowerCase();

      if (
        !item.name ||
        !item.location ||
        !item.abbreviation ||
        !item.shortDisplayName
      )
        continue;

      const createdTeam = await prisma.team.create({
        data: {
          identifier: teamIdentifier,
          fullName: item.name,
          city: item.location,
          abbreviation: item.abbreviation,
          shortName: item.shortDisplayName,
          league: league.name,
          source: 'ESPN.com',
          sportId: sport.id,
        },
      });

      const rosterResult = (await fetchRequest(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${item.id}/roster`
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
            headshotUrl: `https://a.espncdn.com/i/headshots/nfl/players/full/${person.id}.png`,
            linkUrl: `http://www.espn.com/nfl/player/_/id/${person.id}/${person.slug}`,
            source: 'ESPN.com',
            teamId: createdTeam.id,
            sportId: sport.id,
          });
        }
      }

      await prisma.player.createMany({
        data: players,
        skipDuplicates: true,
      });
    } catch (e) {
      console.log('Football Error');
      console.error(e);
    }
  }

  return true;
}
