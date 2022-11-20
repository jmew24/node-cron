import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export default async function getBaseball() {
  const teamResult = (await fetchRequest(
    `https://statsapi.mlb.com/api/v1/teams/`
  )) as MLBResult;

  await prisma.team.deleteMany({
    where: { sport: 'BASEBALL', source: 'MLB.com' },
  });

  for (const item of teamResult.teams) {
    try {
      const teamIdentifier =
        `${item.id}-${item.sport.name}-${item.locationName}-${item.teamName}`.toLowerCase();

      const createdTeam = await prisma.team.create({
        data: {
          identifier: teamIdentifier,
          fullName: item.name,
          city: item.locationName,
          abbreviation: item.abbreviation,
          shortName: item.teamName,
          sport: 'BASEBALL',
          league: item.sport.name,
          source: 'MLB.com',
        },
      });

      const rosterResult = (await fetchRequest(
        `https://statsapi.mlb.com/api/v1/teams/${item.id}/roster/`
      )) as MLBRosterResult;

      if (rosterResult.roster) {
        const players = [] as Prisma.PlayerCreateManyInput[];
        for (const rosterItem of rosterResult.roster) {
          const person = rosterItem.person;
          const position = rosterItem.position;
          const lastName = person.fullName.split(' ')[1] ?? person.fullName;
          const firstName = person.fullName.split(' ')[0] ?? person.fullName;

          players.push({
            identifier:
              `${person.id}-${item.sport.name}-${firstName}-${lastName}`.toLowerCase(),
            lastName: lastName,
            firstName: firstName,
            fullName: person.fullName,
            position: position.abbreviation,
            number: parseInt(rosterItem.jerseyNumber || '-1'),
            headshotUrl: `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${person.id}/headshot/67/current`,
            linkUrl: `https://www.mlb.com/player/${lastName.toLowerCase()}-${firstName.toLowerCase()}-${
              person.id
            }`,
            sport: 'BASEBALL',
            source: 'MLB.com',
            teamId: createdTeam.id,
          });
        }

        await prisma.player.createMany({
          data: players,
          skipDuplicates: true,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return true;
}
