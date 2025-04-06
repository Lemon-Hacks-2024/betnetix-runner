<script lang="ts" setup>
import { watch, ref } from "vue";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { usePreferencesStore } from "@/entities/preferences";

const { date } = defineProps<{ date: number }>();

const dateText = ref(dayjs.unix(date).format("D MMMM YYYY"));
const timeText = ref(dayjs.unix(date).format("HH:mm"));

const { language } = storeToRefs(usePreferencesStore());
watch(language, () => {
  dateText.value = dayjs.unix(date).format("D MMMM YYYY");
  timeText.value = dayjs.unix(date).format("HH:mm");
});
</script>

<template>
  <span v-if="!date">—</span>
  <span v-else>
    <span class="date">
      {{ dateText }}
    </span>
    <span class="time">
      {{ timeText }}
    </span>
  </span>
</template>

<style scoped>
.time {
  font-size: 0.8em;
  opacity: 0.7;
  display: inline;
  margin-left: 5px;
}
</style>
