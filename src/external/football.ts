import proxy from '../lib/proxy';
import prisma from '../lib/prisma';

export default async function getFootball() {
  const teamResult = (await proxy(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
  )) as NFLResult;

  const league = teamResult.sports[0].leagues[0];
  for (const t of league.teams) {
    const item = t.team;
    const team = {
      id: item.id,
      name: item.displayName,
      abbreviation: item.abbreviation,
      teamName: item.nickname,
      shortName: item.shortDisplayName,
    } as NFLTeam;
    const prismaTeam = {
      id: item.id,
      fullName: item.name,
      city: item.location,
      abbreviation: item.abbreviation,
      shortName: item.shortDisplayName,
      sport: 'FOOTBALL',
      league: league.name,
    } as Team;
    const teamIdentifier = `${prismaTeam.id}-${item.slug}`;

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
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${item.id}/roster`
    )) as NFLRosterResult;

    for (const athlete of rosterResult.athletes) {
      try {
        const person = athlete.item;
        const position = person.position;
        const lastName = person.lastName;
        const firstName = person.firstName;
        const player = {
          id: parseInt(person.id || '-1'),
          lastName: lastName,
          firstName: firstName,
          team: team,
          position: position.displayName,
          number: parseInt(person.jersey || '-1'),
          _type: 'player',
          url: person.links[0].href,
          image: person.headshot.href,
          source: 'ESPN.com',
        } as NFLPlayer;
        const playerIdentifier = `${player.id}-${person.slug}`;

        await prisma.player.upsert({
          where: {
            identifier: playerIdentifier,
          },
          update: {
            identifier: playerIdentifier,
            firstName: player.firstName,
            lastName: player.lastName,
            fullName: `${player.firstName} ${player.lastName}`,
            position: player.position,
            logoUrl: player.image,
            linkUrl: player.url,
            sport: 'Football',
            team: { connect: { identifier: teamIdentifier } },
          },
          create: {
            identifier: playerIdentifier,
            firstName: player.firstName,
            lastName: player.lastName,
            fullName: `${player.firstName} ${player.lastName}`,
            position: player.position,
            logoUrl: player.image,
            linkUrl: player.url,
            sport: 'Football',
            team: { connect: { identifier: teamIdentifier } },
          },
        });
      } catch {}
    }
  }

  return Promise.resolve();
}
