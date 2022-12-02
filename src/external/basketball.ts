import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export const getWNBA = async () => {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Basketball',
    },
    update: {
      name: 'Basketball',
    },
    create: {
      name: 'Basketball',
    },
  });

  const teamResult = (await fetchRequest(
    //`https://www.wnba.com/wp-json/api/v1/teams.json`
    `https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams`
  )) as WNBAResult;

  if (!teamResult.sports || teamResult.sports.length <= 0) return true;
  if (
    !teamResult.sports[0] ||
    !teamResult.sports[0].leagues ||
    teamResult.sports[0].leagues.length <= 0
  )
    return true;
  if (
    !teamResult.sports[0].leagues[0] ||
    !teamResult.sports[0].leagues[0].teams ||
    teamResult.sports[0].leagues[0].teams.length <= 0
  )
    return true;

  const deletedTeams = [] as string[];
  const league =
    teamResult.sports[0]?.leagues[0]?.name ||
    `Women's National Basketball Association`;
  for (const t of teamResult.sports[0]?.leagues[0]?.teams) {
    try {
      const source = 'ESPN.com';
      const item = t.team;
      const teamIdentifier = `${item.id}-${league}-${item.slug}`.toLowerCase();

      if (
        !item.displayName ||
        !item.location ||
        !item.abbreviation ||
        !item.shortDisplayName
      ) {
        console.log('WNBA missing team items', item);
        continue;
      }

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
          fullName: item.displayName,
          city: item.location,
          abbreviation: item.abbreviation,
          shortName: item.shortDisplayName,
          league: league,
          source: source,
          sportId: sport.id,
        },
      });

      const rosterResult = (await fetchRequest(
        // https://data.wnba.com/data/5s/v2015/json/mobile_teams/wnba/2022/teams/{item.shortName.toLowerCase()}_roster.json
        `https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams/${item.id}/roster`
      )) as WNBARosterResult;

      if (!rosterResult.athletes || rosterResult.athletes.length <= 0) continue;
      if (rosterResult.status && rosterResult.status != 'success') continue;

      const players = [] as Prisma.PlayerCreateManyInput[];
      for (const athlete of rosterResult.athletes) {
        const lastName = athlete.lastName;
        const firstName = athlete.firstName;
        const playerIdentifier =
          `${athlete.id}-${league}-${athlete.slug}`.toLowerCase();

        if (!athlete.position.displayName) continue;

        players.push({
          identifier: playerIdentifier,
          firstName: firstName,
          lastName: lastName,
          fullName: `${firstName} ${lastName}`,
          position: athlete.position.displayName,
          number: parseInt(athlete.jersey || '-1'),
          headshotUrl: `https://a.espncdn.com/i/headshots/wnba/players/full/${athlete.id}.png`,
          linkUrl: `http://www.espn.com/wnba/player/_/id/${athlete.id}/${athlete.slug}`,
          source: source,
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
      console.log('Basketball [WNBA] Error');
      console.error(e);
    }
  }

  return true;
};

export default async function getBasketball() {
  const sport = await prisma.sport.upsert({
    where: {
      name: 'Basketball',
    },
    update: {
      name: 'Basketball',
    },
    create: {
      name: 'Basketball',
    },
  });

  const teamResult = (await fetchRequest(
    `https://ca.global.nba.com/stats2/league/conferenceteamlist.json?locale=en`
  )) as NBAResult;

  const deletedTeams = [] as string[];
  const league =
    teamResult.payload.league.name === 'NBA'
      ? 'National Basketball Association'
      : teamResult.payload.league.name;
  for (const conference of teamResult.payload.listGroups) {
    try {
      for (const t of conference.teams) {
        const source = 'NBA.com';
        const teamRosterResult = (await fetchRequest(
          `https://ca.global.nba.com/stats2/team/roster.json?locale=en&teamCode=${t.profile.code}`
        )) as NBATeamRosterResult;

        if (teamRosterResult.error.isError === 'true') continue;

        const payload = teamRosterResult.payload;
        const item = payload.profile;
        const teamIdentifier =
          `${item.id}-${item.cityEn}-${item.nameEn}`.toLowerCase();

        if (!item.city || !item.nameEn || !item.nameEn) continue;

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
            fullName: `${item.city} ${item.nameEn}`,
            city: item.city,
            abbreviation: item.displayAbbr,
            shortName: item.nameEn,
            league: league,
            source: source,
            sportId: sport.id,
          },
        });

        if (!payload.players || payload.players.length <= 0) continue;

        const players = [] as Prisma.PlayerCreateManyInput[];
        for (const p of payload.players) {
          const player = p.profile;
          const position = player.position;
          const lastName = player.lastNameEn;
          const firstName = player.firstNameEn;

          if (!player.position) continue;

          players.push({
            identifier:
              `${player.playerId}-${league}-${firstName}-${lastName}`.toLowerCase(),
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`,
            position: position,
            number: parseInt(player.jerseyNo || '-1'),
            headshotUrl: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.playerId}.png`,
            linkUrl: `https://ca.global.nba.com/players/#!/${player.code}`,
            source: source,
            teamId: createdTeam.id,
            sportId: sport.id,
          });
        }

        await prisma.player.createMany({
          data: players,
          skipDuplicates: true,
        });
        console.info(createdTeam.fullName, players.length);
      }
    } catch (e) {
      console.log('Basketball Error');
      console.error(e);
    }
  }

  return true;
}
