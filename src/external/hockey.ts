import proxy from '../lib/proxy';
import prisma from '../lib/prisma';

export default async function getHockey() {
  const teamResult = (await proxy(
    `https://statsapi.web.nhl.com/api/v1/teams`
  )) as NHLTeamResult;

  for (const item of teamResult.teams) {
    const team = {
      id: item.id,
      name: item.name,
      abbreviation: item.abbreviation,
      teamName: item.teamName,
      shortName: item.shortName,
    } as NHLTeam;
    const prismaTeam = {
      id: item.id.toString(),
      fullName: item.name,
      city: item.venue.city,
      abbreviation: item.abbreviation,
      shortName: item.shortName,
      sport: 'HOCKEY',
      league: 'National Hockey League',
    } as Team;
    const teamIdentifier = `${
      prismaTeam.id
    }-${prismaTeam.city.toLowerCase()}-${prismaTeam.shortName.toLowerCase()}`;

    try {
      await prisma.team.upsert({
        where: {
          identifier: teamIdentifier,
        },
        update: {
          identifier: teamIdentifier,
          fullName: prismaTeam.fullName,
          city: prismaTeam.city,
          abbreviation: prismaTeam.abbreviation,
          shortName: prismaTeam.shortName,
          sport: prismaTeam.sport,
          league: prismaTeam.league,
        },
        create: {
          identifier: teamIdentifier,
          fullName: prismaTeam.fullName,
          city: prismaTeam.city,
          abbreviation: prismaTeam.abbreviation,
          shortName: prismaTeam.shortName,
          sport: prismaTeam.sport,
          league: prismaTeam.league,
        },
      });
    } catch {}

    const roster = item.roster.roster as NHLPlayerResult[];
    for (const rosterItem of roster) {
      try {
        const person = rosterItem.person;
        const position = rosterItem.position;
        const player = {
          id: parseInt(person.id || '-1'),
          lastName: person.fullName.split(' ')[1] ?? person.fullName,
          firstName: person.fullName.split(' ')[0] ?? person.fullName,
          team: team,
          position: position.abbreviation,
          number: parseInt(rosterItem.jerseyNumber || '-1'),
          _type: 'player',
          url: `https://www.nhl.com/player/${person.fullName
            .toLowerCase()
            .split(' ')
            .join('_')}`,
          image: `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${person.id}.jpg`,
          source: 'NHL.com',
        } as NHLPlayer;

        await prisma.player.upsert({
          where: {
            identifier: `${
              player.id
            }-${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}`,
          },
          update: {
            identifier: `${
              player.id
            }-${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}`,
            firstName: player.firstName,
            lastName: player.lastName,
            fullName: `${player.firstName} ${player.lastName}`,
            position: player.position,
            logoUrl: player.image,
            linkUrl: player.url,
            sport: 'Hockey',
            team: { connect: { identifier: teamIdentifier } },
          },
          create: {
            identifier: `${
              player.id
            }-${player.firstName.toLowerCase()}-${player.lastName.toLowerCase()}`,
            firstName: player.firstName,
            lastName: player.lastName,
            fullName: `${player.firstName} ${player.lastName}`,
            position: player.position,
            logoUrl: player.image,
            linkUrl: player.url,
            sport: 'Hockey',
            team: { connect: { identifier: teamIdentifier } },
          },
        });
      } catch {}
    }
  }

  return Promise.resolve();
}
