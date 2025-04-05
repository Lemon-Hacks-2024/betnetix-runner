import { api } from "@/shared/api";
import { ApiResponse } from "@/shared/types";

import * as types from "./GroupsType";
import * as ApiTypes from "./GroupsApiType";

export const getRandomPlayers = async (): Promise<types.Player[]> => {
  const res = await api.get<ApiResponse<types.Player[]>>(
    "groups/players/random"
  );

  return res.data.details;
};

export const getGroups = async (): Promise<types.GroupsType[]> => {
  const res = await api.get<ApiResponse<{ groups: types.GroupsType[] }>>(
    "groups"
  );

  return res.data.details?.groups ?? [];
};

export const createGroup = async (
  data: ApiTypes.CreateGroupRequest
): Promise<string> => {
  const res = await api.post<ApiResponse<{ group_id: string }>>("groups", {
    details: data,
  });

  return res.data.details.group_id;
};

export const getGroup = async (id: string): Promise<types.Group> => {
  const res = await api.get<ApiResponse<types.Group>>(`groups/${id}`);

  return res.data.details;
};

export const updateGroup = async (
  data: ApiTypes.UpdateGroupRequest
): Promise<void> => {
  await api.patch<ApiResponse<{ group_id: string }>>(
    `groups/${data.id}/players`,
    {
      details: data,
    }
  );
};

// export const updateGroup = async (
//   data: ApiTypes.UpdateGroupRequest
// ): Promise<void> => {
//   await api.patch<ApiResponse<{ group_id: string }>>(
//     `/groups/:id/races/:quantity`,
//     {
//       details: data,
//     }
//   );
// };
