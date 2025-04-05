import GlobalTexts from "@/app/locale";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: typeof GlobalTexts;
  }
}
