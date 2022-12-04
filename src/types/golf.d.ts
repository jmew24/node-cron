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

declare type PGARosterResult = {
  urlName: string;
  name: string;
  first_name: string;
  last_name: string;
  id: string;
  country: string;
  countryName: string;
  active: boolean;
};

declare type PGAResult = {
  players: PGARosterResult[];
};
