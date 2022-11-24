import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export default async function getHockey() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Hockey',
    },
    update: {
      name: 'Hockey',
    },
    create: {
      name: 'Hockey',
    },
  });

  const teamResult = (await fetchRequest(
    `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`
  )) as NHLTeamResult;

  const deletedTeams = [] as string[];
  for (const item of teamResult.teams) {
    try {
      const source = 'NHL.com';
      const league = 'National Hockey League';
      const teamIdentifier =
        `${item.id}-${league}-${item.locationName}-${item.teamName}`.toLowerCase();

      if (
        !item.name ||
        !item.locationName ||
        !item.abbreviation ||
        !item.teamName
      )
        continue;

      if (
        !deletedTeams.find((dt) => dt === `${source}-${league.toLowerCase()}`)
      ) {
        await prisma.team.deleteMany({
          where: {
            sport: {
              id: sport.id,
            },
            league: league,
            source: source,
          },
        });
        deletedTeams.push(`${source}-${league.toLowerCase()}`);
      }

      const createdTeam = await prisma.team.create({
        data: {
          identifier: teamIdentifier,
          fullName: item.name,
          city: item.locationName,
          abbreviation: item.abbreviation,
          shortName: item.teamName,
          league: league,
          source: source,
          sportId: sport.id,
        },
      });

      if (!item.roster || !item.roster.roster || item.roster.roster.length <= 0)
        continue;

      const roster = item.roster.roster;
      const players = [] as Prisma.PlayerCreateManyInput[];
      for (const rosterItem of roster) {
        const person = rosterItem.person;
        const position = rosterItem.position;
        const lastName = person.fullName.split(' ')[1] ?? person.fullName;
        const firstName = person.fullName.split(' ')[0] ?? person.fullName;

        players.push({
          identifier:
            `${person.id}-${league}-${firstName}-${lastName}`.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
          fullName: person.fullName,
          position: position.abbreviation,
          number: parseInt(rosterItem.jerseyNumber || '-1'),
          headshotUrl: `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${person.id}.jpg`,
          linkUrl: `https://www.nhl.com/player/${person.fullName
            .toLowerCase()
            .split(' ')
            .join('-')}-${person.id}`,
          source: 'NHL.com',
          teamId: createdTeam.id,
          sportId: sport.id,
        });
      }

      await prisma.player.createMany({
        data: players,
        skipDuplicates: true,
      });
      console.info(createdTeam.fullName, players.length);
    } catch (e) {
      console.log('Hockey Error');
      console.error(e);
    }
  }

  return true;
}
