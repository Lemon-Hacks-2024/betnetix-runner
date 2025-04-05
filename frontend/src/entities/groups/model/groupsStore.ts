import { defineStore } from "pinia";
import { useApi } from "@/shared/api";

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

  return {
    // loading
    loadingRandomPlayers,
    loadingGetGroups,
    loadingCreateGroups,

    // actions
    fetchRandomPlayers,
    fetchGetGroups,
    fetchCreateGroups,
  };
});
