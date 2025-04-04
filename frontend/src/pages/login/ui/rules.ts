export const rules = {
  email: [
    { required: true, message: "Введите почту", trigger: "change" },
    { type: "email", message: "Некорректная почта", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Введите пароль", trigger: "change" },
    { min: 6, message: "Минимально 6 символов", trigger: "blur" },
  ],
};
