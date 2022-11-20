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
