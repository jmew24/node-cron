import { Prisma } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

export default async function getBasketball() {
  const teamResult = (await fetchRequest(
    `https://ca.global.nba.com/stats2/league/conferenceteamlist.json?locale=en`
  )) as NBAResult;

  await prisma.team.deleteMany({
    where: { sport: 'BASKETBALL', source: 'NBA.com' },
  });

  const league =
    teamResult.payload.league.name === 'NBA'
      ? 'National Basketball Association'
      : teamResult.payload.league.name;
  for (const conference of teamResult.payload.listGroups) {
    try {
      for (const t of conference.teams) {
        const teamRosterResult = (await fetchRequest(
          `https://ca.global.nba.com/stats2/team/roster.json?locale=en&teamCode=${t.profile.code}`
        )) as NBATeamRosterResult;

        if (teamRosterResult.error.isError === 'true') continue;

        const payload = teamRosterResult.payload;
        const item = payload.profile;
        const teamIdentifier =
          `${item.id}-${item.cityEn}-${item.nameEn}`.toLowerCase();

        if (!item.city || !item.nameEn || !item.nameEn) continue;

        const createdTeam = await prisma.team.create({
          data: {
            identifier: teamIdentifier,
            fullName: `${item.city} ${item.nameEn}`,
            city: item.city,
            abbreviation: item.displayAbbr,
            shortName: item.nameEn,
            sport: 'BASKETBALL',
            league: league,
            source: 'NBA.com',
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
            sport: 'BASKETBALL',
            source: 'NBA.com',
            teamId: createdTeam.id,
          });
        }

        await prisma.player.createMany({
          data: players,
          skipDuplicates: true,
        });
      }
    } catch (e) {
      console.log('Basketball Error');
      console.error(e);
    }
  }

  return true;
}
