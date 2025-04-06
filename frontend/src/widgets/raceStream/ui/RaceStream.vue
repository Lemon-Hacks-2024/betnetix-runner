<script setup lang="ts">
import { ref, onMounted, inject, Ref, watchEffect } from "vue";

import { useTexts } from "@/app/locale/model";
import { Group } from "@/entities/groups";
import { useWebSocket } from "../model/useWebSocket.ts";
import { postWithGroupId } from "../model/apiRaceRun.ts";
import AnimatedRunnerIcon from "./AnimatedRunnerIcon.vue";

const { $t } = useTexts();
const group = inject<Ref<Group>>("dataGroup")!;

const { state, raceDetails, raceFinished, connectWebSocket } = useWebSocket(
  group.value.id
);

onMounted(() => {
  connectWebSocket();
});

// функция для получения индекса игрока в массиве
const getPlayerIndex = (playerId: string): number => {
  console.log(raceDetails);
  console.log(raceDetails.value.results);
  for (let i = 0; i < raceDetails.value.results.length; i++) {
    if (raceDetails.value.results[i].player_id === playerId) {
      console.log("Индекс игрока:", i);
      return i;
    }
  }
  return -1;
};

const getState = (
  state: string,
  position: number
): "run" | "stop" | "start" => {
  console.log(state, position);

  if (position >= 100) return "stop";
  if (state == "update") return "run";
  if (state == "finish" && position < 100) return "run";

  return "start";
};

const getPosition = (playerId: string): number => {
  return raceDetails.value?.results?.[getPlayerIndex(playerId)].distance ?? 0;
};

const disabled = ref(false);
watchEffect(() => {
  if (raceFinished.value) {
    disabled.value = false;
  }
});
</script>

<template>
  <a-card :title="$t.main.raceBroadcast" :bordered="false">
    <template #extra>
      <Transition name="fade">
        <a-button
          v-if="group"
          type="primary"
          :disabled="disabled"
          @click="
            disabled = true;
            postWithGroupId(group.id);
          "
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
            :position="getPosition(player.id)"
            :speed="
              raceDetails?.results?.[getPlayerIndex(player.id)].current_speed ??
              6
            "
            :name="player.name"
            :state="getState(state, getPosition(player.id))"
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
  position: absolute;
  height: 100%;
  width: 60px;
  top: 0;
  left: 0;
  z-index: 1;
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
  position: absolute;
  height: 100%;
  width: 60px;
  top: 0;
  right: 0;
  z-index: 1;
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
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.place-tracks {
  position: relative;
  background-color: #f8fae5;
  grid-template-areas: "start tracks finish";
  grid-template-columns: 60px repeat(1, minmax(0, 1fr)) 60px;
  border-radius: 16px;
}

.countdown {
  width: 100%;
  font-size: 200px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
}

[data-color-scheme="dark"] {
  .start,
  .finish {
    background-color: #292929;
  }
  .place-tracks {
    background-color: #505050;
  }
}
</style>
