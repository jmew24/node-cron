declare type NHLTeamResult = {
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
      roster: {
        roster: [
          {
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
          }
        ];
      };
      shortName: string;
      officialSiteUrl: string;
    }
  ];
};
