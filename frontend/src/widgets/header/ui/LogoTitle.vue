<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { BaseNeumorphic } from "@/shared/ui";
import DarkLogo from "@/assets/images/DarkLogo.webp";
import LightLogo from "@/assets/images/LightLogo.webp";
import { usePreferencesStore } from "@/entities/preferences";
import { useRouter } from "vue-router";

const { isDark } = storeToRefs(usePreferencesStore());

const router = useRouter();

const routeTo = () => router.push("/");
</script>

<template>
  <a-flex align="center" gap="20">
    <BaseNeumorphic
      variant="neu"
      width="100px"
      height="100px"
      radius="999px"
      hover
    >
      <div class="logo-wrapper" @click="routeTo">
        <img v-if="isDark" class="logo" :src="DarkLogo" />
        <img v-else class="logo" :src="LightLogo" />
      </div>
    </BaseNeumorphic>
    <span class="title">LEMONRUN</span>
  </a-flex>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.logo {
  max-width: 80px;
  max-height: 80px;
}

.title {
  font-size: 30px;
  font-weight: bolder;
}
</style>
