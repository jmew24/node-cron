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
