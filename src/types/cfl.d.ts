const RosterData = [
  '33',
  'Johnson, Denzel',
  '',
  'LB',
  'A',
  "6'2",
  '210',
  28,
  'TCU',
  '/players/denzel-johnson/164051/',
];

declare type CFLRosterData = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  string
];

declare type CFLRosterResult = {
  data: CFLRosterData[];
};

declare type CFLResult = {
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
