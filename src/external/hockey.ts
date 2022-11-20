import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export default async function getHockey() {
  const teamResult = (await fetchRequest(
    `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`
  )) as NHLTeamResult;

  await prisma.team.deleteMany({
    where: { sport: 'HOCKEY', source: 'NHL.com' },
  });

  for (const item of teamResult.teams) {
    try {
      const league = 'National Hockey League';
      const teamIdentifier = `${
        item.id
      }-${league}-${item.locationName.toLowerCase()}-${item.teamName.toLowerCase()}`;

      const createdTeam = await prisma.team.create({
        data: {
          identifier: teamIdentifier,
          fullName: item.name,
          city: item.locationName,
          abbreviation: item.abbreviation,
          shortName: item.teamName,
          sport: 'HOCKEY',
          league: league,
          source: 'NHL.com',
        },
      });

      if (item.roster && item.roster.roster) {
        const roster = item.roster.roster as NHLPlayerResult[];
        const players = [] as Prisma.PlayerCreateManyInput[];
        for (const rosterItem of roster) {
          const person = rosterItem.person;
          const position = rosterItem.position;
          const lastName = person.fullName.split(' ')[1] ?? person.fullName;
          const firstName = person.fullName.split(' ')[0] ?? person.fullName;

          players.push({
            identifier: `${
              person.id
            }-${league}-${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
            firstName: firstName,
            lastName: lastName,
            fullName: person.fullName,
            position: position.abbreviation,
            number: parseInt(rosterItem.jerseyNumber || '-1'),
            headshotUrl: `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${person.id}.jpg`,
            linkUrl: `https://www.nhl.com/player/${person.fullName
              .toLowerCase()
              .split(' ')
              .join('_')}`,
            sport: 'HOCKEY',
            source: 'NHL.com',
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
