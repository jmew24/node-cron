import { Prisma, Team } from '@prisma/client';

import fetchRequest from '../lib/fetchRequest';
import prisma from '../lib/prisma';

const CFLTeams: CFLResult = {
  data: [
    {
      team_id: 1,
      letter: 'B',
      abbreviation: 'BC',
      location: 'BC',
      nickname: 'Lions',
      full_name: 'BC Lions',
      venue_id: 1,
      venue_name: 'BC Place',
      venue_capacity: 27000,
      division_id: 2,
      division_name: 'West',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/bc.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/bc.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/bc.png',
      },
    },
    {
      team_id: 2,
      letter: 'C',
      abbreviation: 'CGY',
      location: 'Calgary',
      nickname: 'Stampeders',
      full_name: 'Calgary Stampeders',
      venue_id: 2,
      venue_name: 'McMahon Stadium',
      venue_capacity: 35650,
      division_id: 2,
      division_name: 'West',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/cgy.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/cgy.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/cgy.png',
      },
    },
    {
      team_id: 3,
      letter: 'E',
      abbreviation: 'EDM',
      location: 'Edmonton',
      nickname: 'Elks',
      full_name: 'Edmonton Elks',
      venue_id: 3,
      venue_name: 'Commonwealth Stadium',
      venue_capacity: 56302,
      division_id: 2,
      division_name: 'West',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/edm.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/edm.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/edm.png',
      },
    },
    {
      team_id: 4,
      letter: 'H',
      abbreviation: 'HAM',
      location: 'Hamilton',
      nickname: 'Tiger-Cats',
      full_name: 'Hamilton Tiger-Cats',
      venue_id: 4,
      venue_name: 'Tim Hortons Field',
      venue_capacity: 23218,
      division_id: 1,
      division_name: 'East',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/ham.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/ham.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/ham.png',
      },
    },
    {
      team_id: 5,
      letter: 'M',
      abbreviation: 'MTL',
      location: 'Montreal',
      nickname: 'Alouettes',
      full_name: 'Montreal Alouettes',
      venue_id: 5,
      venue_name: 'Percival Molson Memorial Stadium',
      venue_capacity: 23420,
      division_id: 1,
      division_name: 'East',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/mtl.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/mtl.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/mtl.png',
      },
    },
    {
      team_id: 6,
      letter: 'O',
      abbreviation: 'OTT',
      location: 'Ottawa',
      nickname: 'Redblacks',
      full_name: 'Ottawa Redblacks',
      venue_id: 6,
      venue_name: 'TD Place Stadium',
      venue_capacity: 24000,
      division_id: 1,
      division_name: 'East',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/ott.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/ott.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/ott.png',
      },
    },
    {
      team_id: 7,
      letter: 'S',
      abbreviation: 'SSK',
      location: 'Saskatchewan',
      nickname: 'Roughriders',
      full_name: 'Saskatchewan Roughriders',
      venue_id: 26,
      venue_name: 'Mosaic Stadium',
      venue_capacity: 33350,
      division_id: 2,
      division_name: 'West',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/ssk.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/ssk.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/ssk.png',
      },
    },
    {
      team_id: 8,
      letter: 'T',
      abbreviation: 'TOR',
      location: 'Toronto',
      nickname: 'Argonauts',
      full_name: 'Toronto Argonauts',
      venue_id: 25,
      venue_name: 'BMO Field',
      venue_capacity: 26000,
      division_id: 1,
      division_name: 'East',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/tor.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/tor.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/tor.png',
      },
    },
    {
      team_id: 9,
      letter: 'W',
      abbreviation: 'WPG',
      location: 'Winnipeg',
      nickname: 'Blue Bombers',
      full_name: 'Winnipeg Blue Bombers',
      venue_id: 9,
      venue_name: 'IG Field',
      venue_capacity: 33422,
      division_id: 2,
      division_name: 'West',
      logo_image_url: null,
      images: {
        logo_image_url: 'http://api.cfl.ca/images/logos/wpg.svg',
        tablet_image_url: 'http://api.cfl.ca/images/logos/tablet/wpg.png',
        mobile_image_url: 'http://api.cfl.ca/images/logos/mobile/wpg.png',
      },
    },
  ],
  errors: [],
  meta: {
    copyright: 'Copyright 2020 Canadian Football League.',
  },
};

export default async function getCFL() {
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

  const deletedTeams = [] as string[];
  const teams = [] as Team[];
  const leagueName = 'Canadian Football League';
  const source = 'CFL.ca';
  for (const item of CFLTeams.data) {
    try {
      const teamIdentifier =
        `${item.team_id}-${leagueName}-${item.full_name}`.toLowerCase();

      if (
        !item.full_name ||
        !item.nickname ||
        !item.abbreviation ||
        !item.location
      )
        continue;

      if (
        !deletedTeams.find(
          (dt) => dt === `${source}-${leagueName.toLowerCase()}`
        )
      ) {
        await prisma.team.deleteMany({
          where: {
            sport: {
              id: sport.id,
            },
            league: leagueName,
            source: source,
          },
        });
        deletedTeams.push(`${source}-${leagueName.toLowerCase()}`);
      }

      const createdTeam = await prisma.team.create({
        data: {
          identifier: teamIdentifier,
          fullName: item.full_name,
          city: item.location,
          abbreviation: item.abbreviation,
          shortName: item.nickname,
          league: leagueName,
          source: source,
          sportId: sport.id,
        },
      });
      console.info(createdTeam.fullName);
      teams.push(createdTeam);
    } catch (e) {
      console.log('CFL Error');
      console.error(e);
    }
  }

  try {
    const rosterResult = (await fetchRequest(
      `https://www.cfl.ca/wp-content/themes/cfl.ca/inc/admin-ajax.php?action=get_all_players`
    )) as CFLRosterResult;

    if (!rosterResult?.data || rosterResult?.data?.length <= 0) return true;

    const players = [] as Prisma.PlayerCreateManyInput[];
    for (const rosterItem of rosterResult.data) {
      if (
        rosterItem[0] === '' ||
        rosterItem[1] === '' ||
        rosterItem[2] === '' ||
        rosterItem[7] <= 0 ||
        rosterItem[8] === '' ||
        rosterItem[9] === ''
      )
        continue;

      const playerId = rosterItem[9].split('/')[2]?.replace('/', '') ?? '';
      const team = teams.find((t) => t.abbreviation === rosterItem[2]);
      if (!team) continue;

      const position = rosterItem[3];
      const lastName = rosterItem[1].split(',')[0] ?? '';
      const firstName = rosterItem[1].split(',')[1]?.trim() ?? '';

      if (playerId === '' || firstName === '' || lastName === '') continue;

      players.push({
        identifier:
          `${playerId}-${leagueName}-${firstName}-${lastName}`.toLowerCase(),
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        position: position,
        number: -1,
        headshotUrl:
          'https://www.cfl.ca/wp-content/plugins/cfl-stats/images/player-silhouette.png',
        linkUrl: `https://www.cfl.ca${rosterItem[9]}`,
        source: source,
        teamId: team.id,
        sportId: sport.id,
      });
    }

    console.info(players.length);
    await prisma.player.createMany({
      data: players,
      skipDuplicates: true,
    });
  } catch (e) {
    console.log('CFL Error');
    console.error(e);
  }

  return true;
}
