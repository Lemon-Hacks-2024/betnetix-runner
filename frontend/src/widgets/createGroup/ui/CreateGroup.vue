<script lang="ts" setup>
import { reactive, watchEffect, ref, h } from "vue";
import { MoreOutlined } from "@ant-design/icons-vue";
import { Chrome } from "@ckpack/vue-color";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useTexts } from "@/app/locale/model";

import { FormItemTooltip } from "@/shared/ui";
import { CreateGroupRequest, useGroupsStore } from "@/entities/groups";
import { rules, rulesPlayers } from "./rules";
import { useAnimationCollapse } from "./animationCollapse";

const open = defineModel<boolean>("open");

const router = useRouter();
const { $t } = useTexts();

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
    class="!w-[850px]"
    v-model:open="open"
    :title="$t.main.groupCreating"
    :ok-text="$t.buttons.create"
    @ok="sendForm"
    :ok-button-props="{ loading: loadingCreateGroups }"
  >
    <a-form ref="formRef" :model="formData" :rules="rules" layout="vertical">
      <a-form-item name="name" :label="$t.labels.groupNameLabel">
        <a-input
          v-model:value="formData.name"
          :placeholder="$t.placeholders.enterGroupTitle"
        />
      </a-form-item>

      <a-form-item name="is_self" :label="$t.labels.groupNameLabel">
        <template #tooltip>
          <FormItemTooltip>
            {{ $t.main.randomByDefault }}
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
                :label="i == 0 ? $t.labels.groupNameLabel : ''"
                :rules="rulesPlayers"
                class="player-input"
              >
                <a-input
                  v-model:value="player.name"
                  :placeholder="$t.placeholders.enterName"
                />
              </a-form-item>
              <a-form-item
                :name="['players', i, 'color']"
                :label="i == 0 ? $t.labels.colorLabel : ''"
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

                  <a-input
                    :value="player.color"
                    :placeholder="$t.placeholders.chooseColor"
                  >
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
                :label="i == 0 ? $t.labels.numberLabel : ''"
                :rules="rulesPlayers"
                class="player-input"
              >
                <template #tooltip>
                  <FormItemTooltip>
                    {{ $t.main.numberFromTo }}
                  </FormItemTooltip>
                </template>

                <a-input-number
                  v-model:value="player.number"
                  :min="1"
                  :max="99"
                  :placeholder="$t.placeholders.enterNumber"
                  class="!w-full"
                />
              </a-form-item>

              <a-form-item :label="i == 0 ? ' ' : ''">
                <a-tooltip
                  placement="right"
                  :title="$t.popovers.advancedSettings"
                >
                  <a-button
                    @click="updateAdvancedRow(i)"
                    :icon="h(MoreOutlined)"
                  />
                </a-tooltip>
              </a-form-item>
            </a-flex>

            <Transition
              name="collapse"
              @before-enter="beforeEnter!"
              @enter="enter!"
              @leave="leave!"
            >
              <div v-if="advancedRow === i" class="row-advanced-wrapper">
                <a-flex v-if="advancedRow === i" :gap="12" class="row-advanced">
                  <a-form-item
                    :name="['players', i, 'reaction_time']"
                    :label="$t.labels.reactionTimeLabel"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        {{ $t.main.reactionTimeOnStart }}
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      v-model:value="player.reaction_time"
                      :min="0.1"
                      :max="0.3"
                      :step="0.02"
                      :placeholder="$t.placeholders.enterTime"
                    >
                      <template #addonAfter>сек</template>
                    </a-input-number>
                  </a-form-item>

                  <a-form-item
                    :name="['players', i, 'acceleration']"
                    :label="$t.labels.accelerationLabel"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        {{ $t.main.startingPhase }}<sup>2</sup>
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      v-model:value="player.acceleration"
                      :min="1"
                      :max="20"
                      :placeholder="$t.placeholders.enterAcceleration"
                    >
                      <template #addonAfter>м/с<sup>2</sup></template>
                    </a-input-number>
                  </a-form-item>

                  <a-form-item
                    :name="['players', i, 'max_speed']"
                    :label="$t.labels.maxSpeedLabel"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        {{ $t.main.recommendedValues }}
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      v-model:value="player.max_speed"
                      :placeholder="$t.placeholders.enterSpeed"
                      :min="1"
                      :max="20"
                    >
                      <template #addonAfter>м/с</template>
                    </a-input-number>
                  </a-form-item>

                  <a-form-item
                    :name="['players', i, 'coff_speed_loss']"
                    :label="$t.labels.coffSpeedLossLabel"
                    :rules="rulesPlayers"
                  >
                    <template #tooltip>
                      <FormItemTooltip>
                        {{ $t.main.coffOnFinalPhase }}
                      </FormItemTooltip>
                    </template>

                    <a-input-number
                      :value="Math.round(player.coff_speed_loss * 100)"
                      @update:value="
                        Math.round((player.coff_speed_loss = $event / 100))
                      "
                      :placeholder="$t.placeholders.enterCoff"
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
