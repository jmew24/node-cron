declare type WTAPlayerHeadshotResult = {
  content: {
    id: number;
    accountId: number;
    type: string;
    title: string;
    onDemandUrl: string;
    imageUrl: string;
  }[];
};

declare type WTAPlayerResult = {
  pageInfo: {
    page: number;
    numPages: number;
    pageSize: number;
    numEntries: number;
  };
  content: {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    countryCode: string;
    dateOfBirth: string;
    metadata: null;
  }[];
};

declare type WTARosterResult = {
  id: number;
  first_name: string;
  last_name: string;
  flag_url: string;
  rank: number;
  points: number;
  previous_rank: number;
  earnings: number;
};

declare type WTAResult = {
  status: string;
  code: number;
  data: {
    season: string;
    league_name: string;
    teams: WTARosterResult[];
  };
};

declare type ATPPlayerResult = {
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

declare type ATPRosterResult = {
  id: number;
  first_name: string;
  last_name: string;
  flag_url: string;
  rank: number;
  points: number;
  previous_rank: number;
  earnings: number;
};

declare type ATPResult = {
  status: string;
  code: number;
  data: {
    season: string;
    league_name: string;
    teams: ATPRosterResult[];
  };
};
