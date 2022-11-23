declare type NBATeamRosterResult = {
  error: {
    detail: string | null;
    isError: string;
    message: string | null;
  };
  payload: {
    profile: {
      abbr: string;
      city: string;
      cityEn: string;
      code: string;
      conference: string;
      displayAbbr: string;
      id: string;
      isLeagueTeam: boolean;
      leagueId: string;
      nameEn: string;
    };
    players: [
      {
        profile: {
          code: string;
          displayNameEn: string;
          firstNameEn: string;
          jerseyNo: string;
          lastNameEn: string;
          leagueId: string;
          playerId: string;
          position: string;
        };
      }
    ];
  };
  timestamp: string;
};

declare type NBAResult = {
  payload: {
    league: {
      name: string;
    };
    listGroups: [
      {
        teams: [
          {
            profile: {
              code: string;
            };
          }
        ];
      }
    ];
  };
};

declare type WNBAResult = {
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

declare type WNBARosterResult = {
  status: string;
  coach: [];
  athletes: [
    {
      id: string;
      fullName: string;
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
};
