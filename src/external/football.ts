import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export default async function getFootball() {
  const teamResult = (await fetchRequest(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
  )) as NFLResult;

  await prisma.team.deleteMany({
    where: { sport: 'FOOTBALL', source: 'ESPN.com' },
  });

  const league = teamResult.sports[0].leagues[0];
  for (const t of league.teams) {
    try {
      const item = t.team;
      const teamIdentifier = `${item.id}-${league.name}-${item.slug}`;

      const createdTeam = await prisma.team.create({
        data: {
          identifier: teamIdentifier,
          fullName: item.name,
          city: item.location,
          abbreviation: item.abbreviation,
          shortName: item.shortDisplayName,
          sport: 'FOOTBALL',
          league: league.name,
          source: 'ESPN.com',
        },
      });

      const rosterResult = (await fetchRequest(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${item.id}/roster`
      )) as NFLRosterResult;

      if (rosterResult.athletes) {
        const players = [] as Prisma.PlayerCreateManyInput[];
        for (const athlete of rosterResult.athletes) {
          const person = athlete.item;
          const position = person.position;
          const lastName = person.lastName;
          const firstName = person.firstName;
          const playerIdentifier = `${person.id}-${league.name}-${person.slug}`;

          players.push({
            identifier: playerIdentifier,
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`,
            position: position.displayName,
            number: parseInt(person.jersey || '-1'),
            headshotUrl: person.headshot.href,
            linkUrl: person.links[0].href,
            sport: 'FOOTBALL',
            source: 'ESPN.com',
            teamId: createdTeam.id,
          });
        }

        await prisma.player.createMany({
          data: players,
          skipDuplicates: true,
        });
      }
    } catch {}
  }

  return true;
}
