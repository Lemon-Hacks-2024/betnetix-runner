import { Player } from "./GroupsType";

export interface CreateGroupRequest {
  name: string;
  is_self: boolean;
  players: Player[];
}

export interface UpdateGroupRequest extends CreateGroupRequest {
  id: string;
}

export interface GenerateRacesRequest {
  groupId: string;
  quantity: number;
}
