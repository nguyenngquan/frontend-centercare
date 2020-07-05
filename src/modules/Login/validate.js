export const validateUserName = {
  required: {
    value: true,
    message: "Hãy nhập tài khoản",
  },
  maxLength: {
    value: 30,
    message: "Tài khoản không quá 30 ký tự",
  },
};
