declare type AutoRacingRosterResult = {
  id: number;
  first_name: string;
  last_name: string;
  flag_url: string;
  rank: number;
  points: number;
  previous_rank: number;
  earnings: number;
  country: string;
  bak: number;
  starts: number;
  poles: number;
  wins: number;
  top5: number;
  top10: number;
  not_finished: number;
  points_behind: number;
};

declare type AutoRacingResult = {
  status: string;
  code: number;
  data: {
    season: string;
    league_name: string;
    teams: AutoRacingRosterResult[];
  };
};
