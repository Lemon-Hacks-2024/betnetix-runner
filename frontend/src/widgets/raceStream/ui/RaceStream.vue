<script setup lang="ts">
import { onMounted, inject, Ref } from "vue";

import { useTexts } from "@/app/locale/model";
import { Group } from "@/entities/groups";
import { useWebSocket } from "../model/useWebSocket.ts";
import { postWithGroupId } from "../model/apiRaceRun.ts";
import AnimatedRunnerIcon from "./AnimatedRunnerIcon.vue";

const { $t } = useTexts();
const group = inject<Ref<Group>>("dataGroup")!;

// raceFinished
const { state, raceDetails, connectWebSocket } = useWebSocket(group.value.id);

onMounted(() => {
  connectWebSocket();
});

// функция для получения индекса игрока в массиве
const getPlayerIndex = (playerId: string) => {
  console.log(raceDetails);
  console.log(raceDetails.value.results);
  for (let i = 0; i < raceDetails.value.results.length; i++) {
    if (raceDetails.value.results[i].player_id === playerId) {
      console.log("Индекс игрока:", i);
      return i;
    }
  }
};

const getState = (state: string): "run" | "stop" | "start" => {
  switch (state) {
    case "update":
      return "run";
    case "finish":
      return "stop";
  }
  return "start";
};
</script>

<template>
  <a-card :title="$t.main.raceBroadcast" :bordered="false">
    <template #extra>
      <Transition name="fade">
        <a-button
          v-if="group"
          type="primary"
          @click="postWithGroupId(group.id)"
        >
          {{ $t.main.startRace }}
        </a-button>
      </Transition>
    </template>

    <div class="chart">
      <div class="place-tracks">
        <div class="start">
          <span class="start__label">СТАРТ</span>
        </div>
        <div class="finish">
          <span class="finish__label">ФИНИШ</span>
        </div>

        <div style="grid-area: tracks" class="tracks">
          <AnimatedRunnerIcon
            v-for="player in group.players"
            :key="player.id"
            :color="player.color"
            :position="
              raceDetails?.results?.[getPlayerIndex(player.id)].distance ?? 0
            "
            :speed="
              raceDetails?.results?.[getPlayerIndex(player.id)].current_speed ??
              6
            "
            :name="player.name"
            :state="getState(state)"
          />
        </div>

        <div v-if="state === 'countdown'" class="countdown">
          <span>{{ raceDetails }}</span>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
.start {
  grid-area: start;
  display: flex;
  align-items: center;
  font-size: 50px;
  justify-content: center;
  border-radius: 12px 0 0 12px;
  background-color: #d1d1cd;

  &__label {
    transform: rotate(-90deg);
  }
}

.finish {
  grid-area: finish;
  display: flex;
  align-items: center;
  font-size: 50px;
  justify-content: center;
  border-radius: 0 12px 12px 0;
  background-color: #d1d1cd;

  &__label {
    transform: rotate(90deg);
  }
}

.tracks {
  grid-area: start;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.place-tracks {
  background-color: #f8fae5;
  display: grid;
  grid-template-areas: "start tracks finish";
  grid-template-columns: 60px repeat(1, minmax(0, 1fr)) 60px;
}

.countdown {
  width: 100%;
  font-size: 200px;
  position: absolute;
  display: flex;
  justify-content: center;
}
</style>
