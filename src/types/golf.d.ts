declare type LPGAResult = {
  status: string;
  code: number;
  data: {
    season: string;
    league_name: string;
    teams: [
      {
        id: number;
        first_name: string;
        last_name: string;
        flag_url: string;
        stats: [
          {
            category: string;
            rank: number;
            events: number;
            value: number;
            rounds: number;
            strokes: number;
            stroke_average: number;
          }
        ];
      }
    ];
  };
};

declare type PGAPlayerResult = {
  items: [
    {
      FirstName: string;
      LastName: string;
      Url: string;
      ImageUrl: string;
      ProfileUrl: string;
      NewsUrl: string;
      VideosUrl: string;
    }
  ];
};

declare type PGAResult = {
  pageProps: {
    players: {
      tourCode: string;
      players: [
        {
          id: string;
          age: string;
          headshot: string;
          displayName: string;
          shortName: string;
          firstName: string;
          lastName: string;
          country: string;
          countryFlag: string;
          isActive: boolean;
        }
      ];
    };
  };
};
