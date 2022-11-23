declare type MLSRosterResult = [
  {
    created: number;
    updated: number;
    join_date: number;
    leave_date: null;
    timestamp: null;
    id: number;
    player_id: number;
    club_season_id: number;
    jersey: number;
    on_loan: boolean;
    position_generic: string;
    position_side: string;
    position_specific: string;
    preferred_foot: string;
    player: {
      created: number;
      updated: number;
      birth_date: number;
      id: number;
      opta_id: number;
      full_name: string;
      first_name: string;
      last_name: string;
      known_name: null;
      birth_city: string;
      birth_state: string;
      birth_country: string;
      preferred_foot: string;
      height: number;
      weight: number;
    };
  }
];

declare type MLSResult = [
  {
    optaId: number;
    fullName: string;
    slug: string;
    shortName: string;
    abbreviation: string;
    backgroundColor: string;
    logoBWSlug: string;
    logoColorSlug: string;
    logoColorUrl: string;
    crestColorSlug: string;
  }
];
