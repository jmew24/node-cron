declare type NHLTeam = {
  id: number;
  name: string;
  abbreviation: string;
  teamName: string;
  shortName: string;
};

declare type NHLPlayer = {
  id: number;
  firstName: string;
  lastName: string;
  team: NHLTeam;
  position: string;
  number: number;
  _type: 'player' | 'coach' | 'staff';
  url: string;
  image: string;
  source: string;
};

declare type NHLPlayerResult = {
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
};

declare type NHLResult = {
  teams: [
    {
      id: number;
      name: string;
      link: string;
      venue: {
        name: string;
        link: string;
        city: string;
        timeZone: {
          id: string;
          offset: number;
          tz: string;
        };
      };
      abbreviation: string;
      teamName: string;
      locationName: string;
      firstYearOfPlay: string;
      division: {
        id: number;
        name: string;
        nameShort: string;
        link: string;
        abbreviation: string;
      };
      conference: {
        id: number;
        name: string;
        link: string;
      };
      franchise: {
        franchiseId: number;
        teamName: string;
        link: string;
      };
      roster: {
        roster: NHLPlayerResult[];
      };
      shortName: string;
      officialSiteUrl: string;
      franchiseId: number;
      active: boolean;
    }
  ];
  copyright: string;
};
