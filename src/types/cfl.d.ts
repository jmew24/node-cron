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

declare type CFLData = {
  team_id: number;
  letter: string;
  abbreviation: string;
  location: string;
  nickname: string;
  full_name: string;
  venue_id: number;
  venue_name: string;
  venue_capacity: number;
  division_id: number;
  division_name: string;
  logo_image_url: null;
  images: {
    logo_image_url: string;
    tablet_image_url: string;
    mobile_image_url: string;
  };
};

declare type CFLResult = {
  data: CFLData[];
  errors: [];
  meta: {
    copyright: string;
  };
};
