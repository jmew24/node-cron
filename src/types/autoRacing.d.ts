declare type NascarRosterResult = {
  Nascar_Driver_ID: number;
  Driver_ID: number;
  Driver_Series: string;
  First_Name: string;
  Last_Name: string;
  Full_Name: string;
  Series_Logo: string;
  Short_Name: string;
  Hometown_City: string;
  Crew_Chief: string;
  Hometown_State: string;
  Hometown_Country: string;
  Badge: string;
  Badge_Image: string;
  Manufacturer: string;
  Team: string;
  Image: string;
  Image_Transparent: string;
  Driver_Page: string;
  Age: number;
  Rank: string;
  Points: string;
};

declare type NascarResult = {
  message: string;
  status: number;
  response: NascarRosterResult[];
};

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
