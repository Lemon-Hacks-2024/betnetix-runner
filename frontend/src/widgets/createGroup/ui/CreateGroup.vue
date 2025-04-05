<script lang="ts" setup>
import { reactive, watchEffect, ref, h } from "vue";
import { MoreOutlined } from "@ant-design/icons-vue";
import { Chrome } from "@ckpack/vue-color";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

import { FormItemTooltip } from "@/shared/ui";
import { CreateGroupRequest, useGroupsStore } from "@/entities/groups";
import { rules, rulesPlayers } from "./rules";
import { useAnimationCollapse } from "./animationCollapse";

const open = defineModel<boolean>("open");

const router = useRouter();

const groupsStore = useGroupsStore();
const { fetchRandomPlayers, fetchCreateGroups } = groupsStore;
const { loadingRandomPlayers, loadingCreateGroups } = storeToRefs(groupsStore);

const { beforeEnter, enter, leave } = useAnimationCollapse();

const defaultFormData: CreateGroupRequest = {
  name: "",
  is_self: false,
  players: [],
};

const formData = reactive<CreateGroupRequest>({ ...defaultFormData });

watchEffect(async () => {
  if (!open.value) return;
  formData.players = (await fetchRandomPlayers()) ?? [];
});

const advancedRow = ref<number>(-1);
const updateAdvancedRow = (i: number) => {
  if (i === advancedRow.value) advancedRow.value = -1;
  else advancedRow.value = i;
};

const formRef = ref();
const sendForm = async () => {
  await formRef.value?.validate();
  const groupId = await fetchCreateGroups(formData);

  router.push(`/group/${groupId}`);
  message.success("Группа успешно создана");
};
</script>

<template>
  <a-modal
    v-model:open="open"
    title="Создание группы"
    ok-text="Создать"
    class="!w-[850px]"
    @ok="sendForm"
    :ok-button-props="{ loading: loadingCreateGroups }"
  >
    <a-form ref="formRef" :model="formData" :rules="rules" layout="vertical">
      <a-form-item name="name" label="Название группы">
        <a-input
          v-model:value="formData.name"
          placeholder="Введите название группы"
        />
      </a-form-item>

      <a-form-item name="is_self" label="Указать свои параметры">
        <template #tooltip>
          <FormItemTooltip>
            По умолчанию параметры учеников будут рандомными
          </FormItemTooltip>
        </template>

        <a-switch v-model:checked="formData.is_self" />
      </a-form-item>

      <Transition name="fade">
        <a-spin v-if="formData.is_self" :spinning="loadingRandomPlayers">
          <div v-for="(player, i) in formData.players" :key="i">
            <a-flex :gap="12">
              <a-form-item
                :name="['players', i, 'name']"
                :label="i == 0 ? 'Имя' : ''"
                :rules="rulesPlayers"
                class="player-input"
              >
                <a-input
                  v-model:value="player.name"
                  placeholder="Введите имя"
                />
              </a-form-item>
              <a-form-item
                :name="['players', i, 'color']"
                :label="i == 0 ? 'Цвет' : ''"
                :rules="rulesPlayers"
                class="player-input"
              >
                <a-popover :trigger="['click']" placement="rightTop">
                  <template #content>
                    <Chrome
                      :model-value="player.color"
                      @update:model-value="player.color = $event.hex"
                    />
                  </template>

                  <a-input :value="player.color" placeholder="Выберите цвет">
                    <template #prefix>
                      <div
                        class="color-preview"
                        :style="{ background: player.color }"
                      ></div>
                    </template>
                  </a-input>
                </a-popover>
              </a-form-item>

              <a-form-item
                :name="['players', i, 'number']"
                :label="i == 0 ? 'Номер' : ''"
                :rules="rulesPlayers"
                class="player-input"
              >
                <template #tooltip>
                  <FormItemTooltip> Номер от 1 до 99 </FormItemTooltip>
                </template>

                <a-input-number
                  v-model:value="player.number"
                  :min="1"
                  :max="99"
                  placeholder="Введите номер"
                  class="!w-full"
                />
              </a-form-item>

              <a-form-item :label="i == 0 ? ' ' : ''">
                <a-tooltip placement="right" title="Расширенные настройки">
                  <a-button
                    @click="updateAdvancedRow(i)"
                    :icon="h(MoreOutlined)"
                  />
                </a-tooltip>
              </a-form-item>
            </a-flex>

            <Transition
              name="collapse"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <div v-if="advancedRow === i" class="row-advanced-wrapper">
                <a-flex v-if="advancedRow === i" :gap="12" class="row-advanced">
                  <a-form-item
                    :name="['players', i, 'reaction_time']"
                    label="Время реакции"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        Время реакции на страте. В секундах, диапазон 0.1-0.3
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      v-model:value="player.reaction_time"
                      :min="0.1"
                      :max="0.3"
                      :step="0.02"
                      placeholder="Введите время"
                    >
                      <template #addonAfter>сек</template>
                    </a-input-number>
                  </a-form-item>

                  <a-form-item
                    :name="['players', i, 'acceleration']"
                    label="Ускорение"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        Начальная фаза забега. Рекомендуемые значения от 8 до 12
                        м/с<sup>2</sup>
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      v-model:value="player.acceleration"
                      :min="1"
                      :max="20"
                      placeholder="Введите ускорение"
                    >
                      <template #addonAfter>м/с<sup>2</sup></template>
                    </a-input-number>
                  </a-form-item>

                  <a-form-item
                    :name="['players', i, 'max_speed']"
                    label="Макс. скорость"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        Рекомендуемые значения от 10 до 12 м/с
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      v-model:value="player.max_speed"
                      placeholder="Введите скорость"
                      :min="1"
                      :max="20"
                    >
                      <template #addonAfter>м/с</template>
                    </a-input-number>
                  </a-form-item>

                  <a-form-item
                    :name="['players', i, 'coff_speed_loss']"
                    label="Коэф. потери"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        Коэф. потери скорости на финальной стадии. Рекомендуемые
                        значения от 1 до 5%
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      :value="Math.round(player.coff_speed_loss * 100)"
                      @update:value="
                        Math.round((player.coff_speed_loss = $event / 100))
                      "
                      placeholder="Введите коэффициент"
                      :min="1"
                      :max="10"
                      :rules="rulesPlayers"
                    >
                      <template #addonAfter>%</template>
                    </a-input-number>
                  </a-form-item>
                </a-flex>
              </div>
            </Transition>
          </div>
        </a-spin>
      </Transition>
    </a-form>
  </a-modal>
</template>

<style scoped>
.color-preview {
  width: 12px;
  height: 12px;
  border-radius: 12px;
  margin-right: 5px;
  border: 1px solid #d9d9d9;
}
.player-input {
  width: 100%;
}
.row-advanced-wrapper {
  overflow: hidden;
}
.row-advanced {
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 24px;
}
</style>
