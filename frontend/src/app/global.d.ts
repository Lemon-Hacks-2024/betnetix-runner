import { TextsType } from "@/app/locale";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: TextsType;
  }
}
