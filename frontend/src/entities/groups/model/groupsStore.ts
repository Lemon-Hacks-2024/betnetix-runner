import { defineStore } from "pinia";
import { useApi } from "@/shared/api";

// import * as ApiTypes from "./GroupsApiType";
import * as api from "./groupsApi";

export const useGroupsStore = defineStore("groups", () => {
  const { loading: loadingRandomPlayers, execute: fetchRandomPlayers } = useApi(
    api.getRandomPlayers
  );

  const { loading: loadingGetGroups, execute: fetchGetGroups } = useApi(
    api.getGroups
  );

  const { loading: loadingCreateGroups, execute: fetchCreateGroups } = useApi(
    api.createGroup,
    {
      messagesError: {
        400: "Ошибка в формате данных",
      },
    }
  );

  const { loading: loadingGetGroup, execute: fetchGetGroup } = useApi(
    api.getGroup,
    {
      messagesError: {
        404: "Группа не найдена",
      },
    }
  );

  const { loading: loadingUpdateGroup, execute: fetchUpdateGroup } = useApi(
    api.updateGroup
  );

  const { loading: loadingAnalyticsPlaces, execute: fetchAnalyticsPlaces } =
    useApi(api.getAnalyticsPlaces);

  const { loading: loadingAnalyticsTop2, execute: fetchAnalyticsTop2 } = useApi(
    api.getAnalyticsTop2
  );

  const { loading: loadingAnalyticsTop3, execute: fetchAnalyticsTop3 } = useApi(
    api.getAnalyticsTop3
  );

  const { loading: loadingAnalyticsPairs, execute: fetchAnalyticsPairs } =
    useApi(api.getAnalyticsPairs);

  const { loading: loadingGenerateRaces, execute: fetchGenerateRaces } = useApi(
    api.generateRaces
  );

  return {
    // loading
    loadingRandomPlayers,
    loadingGetGroups,
    loadingCreateGroups,
    loadingGetGroup,
    loadingUpdateGroup,
    loadingAnalyticsPlaces,
    loadingAnalyticsTop2,
    loadingAnalyticsTop3,
    loadingAnalyticsPairs,
    loadingGenerateRaces,

    // actions
    fetchRandomPlayers,
    fetchGetGroups,
    fetchCreateGroups,
    fetchGetGroup,
    fetchUpdateGroup,
    fetchAnalyticsPlaces,
    fetchAnalyticsTop2,
    fetchAnalyticsTop3,
    fetchAnalyticsPairs,
    fetchGenerateRaces,
  };
});
