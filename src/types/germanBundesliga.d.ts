declare type BundesligaRosterResult = {
  coach: [];
  athletes: [
    {
      id: string;
      guid: string;
      firstName: string;
      lastName: string;
      middleName: string;
      fullName: string;
      displayName: string;
      displayWeight: string;
      slug: string;
      jersey: string;
      position: {
        id: string;
        name: string;
        displayName: string;
        abbreviation: string;
        leaf: boolean;
      };
    }
  ];
};

declare type BundesligaResult = {
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
