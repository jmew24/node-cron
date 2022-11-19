declare type MLBTeam = {
  id: number;
  name: string;
  abbreviation: string;
  teamName: string;
  shortName: string;
};

declare type MLBPlayer = {
  id: number;
  firstName: string;
  lastName: string;
  team: MLBTeam;
  position: string;
  number: number;
  _type: 'player' | 'coach' | 'staff';
  url: string;
  image: string;
  source: string;
};

declare type MLBPlayerResult = {
  person: {
    id: string;
    fullName: string;
    link: string;
  };
  jerseyNumber: string;
  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  status: {
    code: string;
    description: string;
  };
  parentTeamId: number;
};

declare type MLBRosterResult = {
  roster: MLBPlayerResult[];
  link: string;
  teamId: number;
  rosterType: string;
  copyright: string;
};

declare type MLBResult = {
  teams: [
    {
      springLeague: {
        id: number;
        name: string;
        link: string;
        abbreviation: string;
      };
      allStarStatus: string;
      id: number;
      name: string;
      link: string;
      season: number;
      venue: {
        id: number;
        name: string;
        link: string;
      };
      springVenue: {
        id: number;
        link: string;
      };
      teamCode: string;
      fileCode: string;
      abbreviation: string;
      teamName: string;
      locationName: string;
      firstYearOfPlay: string;
      league: {
        id: number;
        name: string;
        link: string;
      };
      division: {
        id: number;
        name: string;
        link: string;
      };
      sport: {
        id: number;
        link: string;
        name: string;
      };
      shortName: string;
      franchiseName: string;
      clubName: string;
      active: boolean;
    }
  ];
  copyright: string;
};
