declare type NFLRosterResult = {
  coach: [];
  athletes: [
    {
      position: string;
      items: [
        {
          id: string;
          firstName: string;
          lastName: string;
          slug: string;
          jersey: string;
          position: {
            id: string;
            name: string;
            displayName: string;
            abbreviation: string;
          };
        }
      ];
    }
  ];
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
          teams: [
            {
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
            }
          ];
        }
      ];
    }
  ];
};
