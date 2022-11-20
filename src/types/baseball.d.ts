declare type MLBPlayerResult = {
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
  status: {
    code: string;
    description: string;
  };
  parentTeamId: number;
};

declare type MLBRosterResult = {
  roster: MLBPlayerResult[];
  link: string;
  teamId: number;
  rosterType: string;
};

declare type MLBResult = {
  teams: [
    {
      id: number;
      name: string;
      link: string;
      season: number;
      teamCode: string;
      fileCode: string;
      abbreviation: string;
      teamName: string;
      locationName: string;
      league: {
        id: number;
        name: string;
        link: string;
      };
      sport: {
        id: number;
        link: string;
        name: string;
      };
      shortName: string;
      franchiseName: string;
      clubName: string;
    }
  ];
};
