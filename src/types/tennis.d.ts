const WTAPlayerHeadshotResult = {
  content: [
    {
      id: 2839751,
      accountId: 29,
      type: 'photo',
      title: 'Haddad-Maia_crop-v2',
      onDemandUrl:
        'https://photoresources.wtatennis.com/photo-resources/2022/10/04/ecaecdbc-c59f-4d5e-b372-84ee7ddc1c1f/Haddad-Maia_crop-v2.jpg',
      imageUrl:
        'https://photoresources.wtatennis.com/wta/photo/2022/10/04/7fce8e54-ec8d-4980-8de7-ddfdac902096/Haddad-Maia_crop-v2.jpg',
    },
  ],
};

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
