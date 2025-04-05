import { Player } from "./GroupsType";

export interface CreateGroupRequest {
  name: string;
  is_self: boolean;
  players: Player[];
}
