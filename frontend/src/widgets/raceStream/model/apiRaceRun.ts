// api.js
import axios from "axios";

/**
 * Отправляет POST-запрос на заданный URL с параметром groupId.
 * @param {string} url URL для отправки запроса.
 * @param {string} groupId Идентификатор группы.
 * @returns {Promise} Promise объект с результатом запроса.
 */
export function postWithGroupId(groupId: string) {
  const url = `https://stage.ui-platform.ru/api-hack/v1/groups/${groupId}/races`;
  return axios
    .post(url)
    .then((response) => {
      // Обработка успешного ответа
      console.log("Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      // Обработка ошибки
      console.error("Error during the API call:", error);
      throw error;
    });
}
