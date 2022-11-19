import proxy from '../lib/proxy';
import prisma from '../lib/prisma';

export default async function getBaseball() {
  const teamResult = (await proxy(
    `https://statsapi.mlb.com/api/v1/teams/`
  )) as MLBResult;

  for (const item of teamResult.teams) {
    const team = {
      id: item.id,
      name: item.name,
      abbreviation: item.abbreviation,
      teamName: item.teamName,
      shortName: item.shortName,
    } as MLBTeam;
    const prismaTeam = {
      id: item.id.toString(),
      fullName: item.name,
      city: item.locationName,
      abbreviation: item.abbreviation,
      shortName: item.shortName,
      sport: 'BASEBALL',
      league: item.sport.name,
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

    const rosterResult = (await proxy(
      `https://statsapi.mlb.com/api/v1/teams/${item.id}/roster/`
    )) as MLBRosterResult;

    for (const rosterItem of rosterResult.roster) {
      try {
        const person = rosterItem.person;
        const position = rosterItem.position;
        const lastName = person.fullName.split(' ')[1] ?? person.fullName;
        const firstName = person.fullName.split(' ')[0] ?? person.fullName;
        const player = {
          id: parseInt(person.id || '-1'),
          lastName: lastName,
          firstName: firstName,
          team: team,
          position: position.abbreviation,
          number: parseInt(rosterItem.jerseyNumber || '-1'),
          _type: 'player',
          url: `https://www.mlb.com/player/${lastName.toLowerCase()}-${firstName.toLowerCase()}-${
            person.id
          }`,
          image: `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${person.id}/headshot/67/current`,
          source: 'MLB.com',
        } as MLBPlayer;

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
            sport: 'Baseball',
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
            sport: 'Baseball',
            team: { connect: { identifier: teamIdentifier } },
          },
        });
      } catch {}
    }
  }

  return Promise.resolve();
}
