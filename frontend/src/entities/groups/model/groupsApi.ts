import { api } from "@/shared/api";
import { ApiResponse } from "@/shared/types";

import * as types from "./GroupsType";
import * as ApiTypes from "./GroupsApiType";
import { RacesModel } from "./RacesModel";

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
      details: data.players,
    }
  );
};


export const getAnalyticsPlaces = async (
  id: string
): Promise<ApiTypes.AnalyticsPlace[]> => {
  const res = await api.get<ApiResponse<ApiTypes.AnalyticsPlace[]>>(
    `groups/${id}/analytics/places`
  );

  return res.data.details ?? [];
};

export const getAnalyticsTop2 = async (
  id: string
): Promise<ApiTypes.AnalyticsTop[]> => {
  const res = await api.get<ApiResponse<ApiTypes.AnalyticsTop[]>>(
    `groups/${id}/analytics/top2`
  );

  return res.data.details ?? [];
};

export const getAnalyticsTop3 = async (
  id: string
): Promise<ApiTypes.AnalyticsTop[]> => {
  const res = await api.get<ApiResponse<ApiTypes.AnalyticsTop[]>>(
    `groups/${id}/analytics/top3`
  );

  return res.data.details ?? [];
};

export const getAnalyticsPairs = async (
  id: string
): Promise<ApiTypes.AnalyticsPairs> => {
  const res = await api.get<ApiResponse<ApiTypes.AnalyticsPairs>>(
    `groups/${id}/analytics/pairs`
  );

  return res.data.details ?? [];

export const generateRaces = async (
  data: ApiTypes.GenerateRacesRequest
): Promise<RacesModel> => {
  try {
    const res = await api.post<RacesModel>(
      `/groups/${data.groupId}/races/${data.quantity}`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }

};
