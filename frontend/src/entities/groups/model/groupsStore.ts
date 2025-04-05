import { defineStore } from "pinia";
import { useApi } from "@/shared/api";

import * as ApiTypes from "./GroupsApiType";
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

  return {
    // loading
    loadingRandomPlayers,
    loadingGetGroups,
    loadingCreateGroups,
    loadingGetGroup,
    loadingUpdateGroup,

    // actions
    fetchRandomPlayers,
    fetchGetGroups,
    fetchCreateGroups,
    fetchGetGroup,
    fetchUpdateGroup,
  };
});
