import { Player } from "./GroupsType";

export interface CreateGroupRequest {
  name: string;
  is_self: boolean;
  players: Player[];
}

export interface UpdateGroupRequest extends CreateGroupRequest {
  id: string;
}

export interface AnalyticsPlace {
  player_id: string;
  places_probability: number[];
}

export interface AnalyticsTop {
  player_id: string;
  top_probability: number;
}

export type AnalyticsPairs = AnalyticsPairsItem[][];

export interface AnalyticsPairsItem {
  id: string;
  chance: number;
}

export interface GenerateRacesRequest {
  groupId: string;
  quantity: number;
}
