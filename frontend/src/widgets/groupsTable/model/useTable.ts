import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useGroupsStore, GroupsType } from "@/entities/groups";

export const useTable = () => {
  const groupsStore = useGroupsStore();
  const { fetchGetGroups } = groupsStore;
  const { loadingGetGroups } = storeToRefs(groupsStore);

  const pagination = {
    hideOnSinglePage: true,
  };

  const dataGroups = ref<GroupsType[]>([]);

  onMounted(async () => {
    dataGroups.value = (await fetchGetGroups()) ?? [];
  });

  return {
    loadingGetGroups,
    pagination,
    dataGroups,
  };
};
