import { inject, ref, Ref } from "vue";
import { Group } from "./GroupsType";

export const useGroupContext = () => {
  const dataGroup = inject<Ref<Group | null>>("dataGroup", ref(null));
  const reloadGroup = inject<(id: string) => Promise<void>>(
    "reloadGroup",
    async () => {}
  );

  return { dataGroup, reloadGroup };
};
