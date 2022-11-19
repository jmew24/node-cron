declare type NFLTeam = {
  id: string;
  name: string;
  abbreviation: string;
  teamName: string;
  shortName: string;
};

declare type NFLPlayer = {
  id: number;
  firstName: string;
  lastName: string;
  team: NFLTeam;
  position: string;
  number: number;
  _type: 'player' | 'coach' | 'staff';
  url: string;
  image: string;
  source: string;
};

declare type NFLAthleteResult = {
  position: string;
  item: {
    id: string;
    firstName: string;
    lastName: string;
    links: [
      {
        href: string;
      }
    ];
    headshot: {
      href: string;
    };
    slug: string;
    jersey: string;
    position: {
      id: string;
      name: string;
      displayName: string;
      abbreviation: string;
    };
  };
};

declare type NFLRosterResult = {
  coach: [];
  athletes: NFLAthleteResult[];
};

declare type NFLTeamResult = {
  team: {
    id: string;
    slug: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    name: string;
    nickname: string;
    location: string;
  };
};

declare type NFLResult = {
  sports: [
    {
      id: string;
      uid: string;
      name: string;
      slug: string;
      leagues: [
        {
          id: string;
          uid: string;
          name: string;
          abbreviation: string;
          shortName: string;
          slug: string;
          teams: NFLTeamResult[];
        }
      ];
    }
  ];
};
