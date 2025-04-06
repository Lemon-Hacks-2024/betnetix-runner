<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from 'vue';

export default defineComponent({
  props: {
    speed: {
      type: Number,
      default: 6
    },
    color: {
      type: String,
      default: '#FF0000'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    position: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const currentIndex = ref(0);
    const svgPaths = [];
    for (let i = 1; i <= 24; i++) {
      svgPaths.push(`/animatedRunnerFrames/${i}.svg`);
    }

    const loadedSvgs = ref<string[]>([]);
    const svgContent = ref('');
    const originalColor = '#33CBCA';
    const timer = ref<NodeJS.Timeout | null>(null);

    const interval = computed(() => 1000 / (props.speed * 4.5));

    async function loadAllSvgs() {
      const promises = svgPaths.map(async path => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load SVG at ${path}`);
        const svgText = await response.text();
        return svgText.replace(new RegExp(originalColor, 'gi'), props.color)
            .replace(/width="[^"]*"/, `width="${props.width}"`)
            .replace(/height="[^"]*"/, `height="${props.height}"`);
      });

      try {
        loadedSvgs.value = await Promise.all(promises);
      } catch (error) {
        console.error('Failed to load SVGs:', error);
      }
    }

    function updateSvgContent() {
      if (loadedSvgs.value.length > currentIndex.value) {
        svgContent.value = loadedSvgs.value[currentIndex.value];
      }
    }

    function startAnimation() {
      timer.value = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % svgPaths.length;
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

    return { svgContent };
  }
});
</script>

<template>
  <div class="player" :style="{left: position+'%'}">
    <div v-html="svgContent"></div>
  </div>
</template>

<style scoped>
.player {
  position: absolute;
  transition: left 0.8s linear; /* Плавное перемещение */
  bottom: 5px;
  transform: translateX(-50%);
}
</style>
