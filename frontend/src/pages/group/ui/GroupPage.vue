<script lang="ts" setup>
import { watch, ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AxiosError } from "axios";
import { storeToRefs } from "pinia";

import { useGroupsStore, Group } from "@/entities/groups";
import StatisticsGroup from "@/widgets/statisticsGroup";
import PredictionOutcomes from "@/widgets/predictionOutcomes";
import Skeleton from "./Skeleton.vue";
import ControlBar from "@/widgets/controlBar";
import RaceStream from "@/widgets/raceStream";

const route = useRoute();
const router = useRouter();

const groupsStore = useGroupsStore();
const { fetchGetGroup } = groupsStore;
const { loadingGetGroup } = storeToRefs(groupsStore);

const dataGroup = ref<Group | null>(null);
provide("dataGroup", dataGroup);

const loadGroup = async (groupId: string) => {
  try {
    const group = await fetchGetGroup(groupId);
    dataGroup.value = group;
    document.title = group!.name + " | Lemon";
  } catch (e) {
    const err = e as AxiosError;
    if (err.status === 404) {
      router.replace("/");
    }
  }
};

provide("reloadGroup", loadGroup);

watch(
  () => route.params.groupId,
  (groupId) => {
    if (groupId) loadGroup(groupId as string);
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <Transition appear>
      <Skeleton v-if="loadingGetGroup" />

      <a-flex v-else-if="dataGroup" vertical :gap="30">
        <ControlBar />
        <PredictionOutcomes />
        <RaceStream />
        <StatisticsGroup />
      </a-flex>

      <div v-else><a-empty /></div>
    </Transition>
  </div>
</template>
