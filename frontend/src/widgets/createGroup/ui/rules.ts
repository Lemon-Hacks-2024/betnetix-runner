export const rules = {
  name: [
    { required: true, message: "Введите название группы", trigger: "change" },
  ],
};

export const rulesPlayers = {
  required: true,
  message: "Обязательное поле",
  trigger: "change",
};
