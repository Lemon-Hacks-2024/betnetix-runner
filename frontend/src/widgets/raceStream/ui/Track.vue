<script setup lang="ts">
import {ref} from "vue";
import AnimatedRunnerIcon from "@/widgets/raceStream/ui/AnimatedRunnerIcon.vue";

const {
  color,
  speed,
  position
} = defineProps<{
  color: string;
  speed: number;
  position: number;
}>();

// const position = ref(0);
// let speed = 6;
// const interval = setInterval(() => {
//   speed = Math.floor(Math.random() * (10 - 4 + 1)) + 3;
//   position.value += speed;
//   if (position.value > 100) clearInterval(interval);
// }, 500)
</script>

<template>
  <div class="track">
    <AnimatedRunnerIcon :position="position" :color="color" :speed="speed"/>
  </div>
</template>

<style scoped lang="scss">
.track {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  position: relative;
  height: 60px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}
</style>
