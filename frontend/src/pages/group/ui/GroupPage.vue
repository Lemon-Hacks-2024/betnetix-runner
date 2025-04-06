<script lang="ts" setup>
import { watch, ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AxiosError } from "axios";
import { storeToRefs } from "pinia";

import { useGroupsStore, Group } from "@/entities/groups";
import StatisticsGroup from "@/widgets/statisticsGroup";
import PredictionOutcomes from "@/widgets/predictionOutcomes";
import Skeleton from "./Skeleton.vue";
import RaceStream from "@/widgets/raceStream";

const route = useRoute();
const router = useRouter();

const groupsStore = useGroupsStore();
const { fetchGetGroup } = groupsStore;
const { loadingGetGroup } = storeToRefs(groupsStore);

const dataGroup = ref<Group | null>(null);
provide("dataGroup", dataGroup);

watch(
  () => route.params.groupId,
  async (groupId) => {
    try {
      dataGroup.value = await fetchGetGroup(groupId as string);

      document.title = dataGroup.value!.name + " | Lemon";
    } catch (e) {
      const err = e as AxiosError;
      if (err.status === 404) {
        router.replace("/");
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <Transition appear>
      <Skeleton v-if="loadingGetGroup" />

      <a-flex v-else-if="dataGroup" vertical :gap="30">
        <PredictionOutcomes />
        <RaceStream />
        <StatisticsGroup />
      </a-flex>

      <div v-else><a-empty /></div>
    </Transition>
  </div>
</template>
