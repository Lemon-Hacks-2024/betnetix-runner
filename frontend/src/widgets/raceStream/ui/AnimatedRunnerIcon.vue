<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed } from "vue";

const {
  speed = 6,
  color = "#FF0000",
  width = "100px",
  height = "100px",
  position = 0,
  name = "—",
  state = "stop",
} = defineProps<{
  speed?: number;
  color?: string;
  width?: string;
  height?: string;
  position?: number;
  name?: string;
  state?: "run" | "stop" | "start";
}>();

const currentIndex = ref(0);
const svgPaths: string[] = [];
for (let i = 1; i <= 24; i++) {
  svgPaths.push(`/animatedRunnerFrames/${i}.svg`);
}
const svgPathStart: string[] = ["/animatedRunnerFrames/player_start.svg"];
const svgPathStop: string[] = ["/animatedRunnerFrames/player_stop.svg"];

const loadedSvgs = ref<string[]>([]);
const svgStart = ref<string[]>([]);
const svgStop = ref<string[]>([]);

const svgContent = ref("");
const originalColor = "#33CBCA";
const timer = ref<ReturnType<typeof setInterval> | null>(null);

const interval = computed(() => 1000 / (speed * 6.5));

async function loadAllSvgs() {
  const promises = svgPaths.map(async (path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load SVG at ${path}`);
    const svgText = await response.text();
    return svgText
      .replace(new RegExp(originalColor, "gi"), color)
      .replace(/width="[^"]*"/, `width="${width}"`)
      .replace(/height="[^"]*"/, `height="${height}"`);
  });

  // start svg
  const promisesStart = svgPathStart.map(async (path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load SVG at ${path}`);
    const svgText = await response.text();
    return svgText
      .replace(new RegExp(originalColor, "gi"), color)
      .replace(/width="[^"]*"/, `width="${width}"`)
      .replace(/height="[^"]*"/, `height="${height}"`);
  });

  // stop svg
  const promisesStop = svgPathStop.map(async (path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load SVG at ${path}`);
    const svgText = await response.text();
    return svgText
      .replace(new RegExp(originalColor, "gi"), color)
      .replace(/width="[^"]*"/, `width="${width}"`)
      .replace(/height="[^"]*"/, `height="${height}"`);
  });

  try {
    loadedSvgs.value = await Promise.all(promises);
    svgStart.value = await Promise.all(promisesStart);
    svgStop.value = await Promise.all(promisesStop);
  } catch (error) {
    console.error("Failed to load SVGs:", error);
  }
}

function updateSvgContent() {
  if (loadedSvgs.value.length > currentIndex.value) {
    switch (state) {
      case "run":
        svgContent.value = loadedSvgs.value[currentIndex.value];
        break;
      case "start":
        svgContent.value = svgStart.value[currentIndex.value];
        break;
      case "stop":
        svgContent.value = svgStop.value[currentIndex.value];
        break;
    }
  }
}

function startAnimation() {
  timer.value = setInterval(() => {
    switch (state) {
      case "run":
        currentIndex.value = (currentIndex.value + 1) % svgPaths.length;
        break;

      default:
        currentIndex.value = 0;
    }
    updateSvgContent();
  }, interval.value);
}

onMounted(async () => {
  await loadAllSvgs();
  updateSvgContent();
  startAnimation();
});

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value);
});
</script>

<template>
  <div class="track">
    <div class="track__name">{{ name }}</div>

    <div
      class="player"
      :class="{ stop: state == 'stop', start: state == 'start' }"
      :style="{ left: Math.min(position, 96) + '%' }"
    >
      <div v-html="svgContent"></div>
    </div>
  </div>
</template>

<style scoped>
.player {
  position: absolute;
  transition: 1.3s linear;
  bottom: 5px;
  z-index: 2;
  transform: translateX(-23px);
}
.player.start {
  bottom: -10px;
}

.track {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  position: relative;
  height: 60px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-radius: 16px;
}

.track__name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.7;
  font-size: 20px;
  color: var(--text-color);
}
</style>
