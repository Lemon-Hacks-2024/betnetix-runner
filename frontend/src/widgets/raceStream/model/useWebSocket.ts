import { ref, onUnmounted, inject, Ref } from "vue";
import { useFinish } from "./showFinish";

export function useWebSocket(groupId: string) {
  const { showFinish } = useFinish();

  const ws = ref<WebSocket | null>(null);
  const raceDetails = ref<any | null>(null);
  const raceFinished = ref(false);
  const state = ref("");

  function connectWebSocket() {
    ws.value = new WebSocket(
      `wss://stage.ui-platform.ru/api-hack/v1/streams/race?group_id=${groupId}`
    );

    ws.value.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.value.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.message) {
        case "countdown":
          state.value = data.message;
          console.log("Отсчет времени:", data.details);
          raceDetails.value = data.details;

          break;

        case "update":
          state.value = data.message;
          raceDetails.value = data.details;
          break;

        case "finish":
          state.value = data.message;
          raceFinished.value = true;
          console.log("Забег завершен!");
          showFinish(data.details.results);
          break;

        default:
          break;
      }
    };

    ws.value.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.value.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setTimeout(connectWebSocket, 1000);
    };
  }

  onUnmounted(() => {
    if (ws.value) {
      ws.value.close();
    }
  });

  return { state, raceDetails, raceFinished, connectWebSocket };
}
