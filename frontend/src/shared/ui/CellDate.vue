<script lang="ts" setup>
import dayjs from "dayjs";
const { date } = defineProps<{ date: number }>();
</script>

<template>
  <span v-if="!date">—</span>
  <span v-else>
    <span class="date">
      {{ dayjs.unix(date).format("D MMMM YYYY") }}
    </span>
    <span class="time">
      {{ dayjs.unix(date).format("HH:mm") }}
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
