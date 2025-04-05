export interface Group {
  id: string;
  name: string;
  date_time_last_race: number;
  races: Race[] | null;
  players: Player[] | null;
}

export interface Player {
  id: string;
  group_id?: string;
  name: string;
  color: string;
  number: number;
  reaction_time: number;
  acceleration: number;
  max_speed: number;
  coff_speed_loss: number;
}

export interface Race {}

export interface GroupsType {
  id: number;
  name: string;
  date_time_last_race: number;
}
