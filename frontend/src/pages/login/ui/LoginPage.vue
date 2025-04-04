<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { LoginData, useUserStore } from "@/entities/user";
import { rules } from "./rules";

const router = useRouter();
const { fetchSignin } = useUserStore();

const formData = reactive<LoginData>({
  email: "",
  password: "",
});

const loading = ref(false);
const sendForm = async () => {
  try {
    loading.value = true;
    console.log(formData);
    await fetchSignin(formData);
    message.success("Вы вошли");

    setTimeout(() => {
      router.push("/");
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <a-card title="Вход" :bordered="false">
    <a-form
      :model="formData"
      :rules="rules"
      layout="vertical"
      @finish="sendForm"
    >
      <a-form-item label="Почта" name="email">
        <a-input v-model:value="formData.email" placeholder="Почта">
          <template #prefix> @ </template>
        </a-input>
      </a-form-item>

      <a-form-item label="Пароль" name="password">
        <a-input-password
          v-model:value="formData.password"
          placeholder="Пароль"
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">
          Войти
        </a-button>
      </a-form-item>

      <div style="text-align: right">
        <router-link to="/register"> Регистрация </router-link>
      </div>
    </a-form>
  </a-card>
</template>
