import { ref } from "vue";
import { ApiError, UseApiOptions } from "../types";
import { handleApiError } from "./handleApiError";
import { message } from "ant-design-vue";

export function useApi<T, P = void>(
  apiCall: (params: P) => Promise<T>,
  options: UseApiOptions = {}
) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<ApiError | null>(null);

  const execute = async (params: P): Promise<T | null> => {
    setTimeout(() => {
      loading.value = true;
      error.value = null;
    });

    try {
      const result = await apiCall(params);
      data.value = result;

      if (options.resetOnSuccess) {
        setTimeout(() => {
          data.value = null;
        }, 2000);
      }

      return result;
    } catch (e) {
      error.value = handleApiError(e);

      if (options.isMessageError !== false) {
        const errorMessage = options.messagesError?.[error.value.code];
        console.log(errorMessage || error.value.message);
        message.error(errorMessage || error.value.message);
      }

      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    execute,
  };
}
