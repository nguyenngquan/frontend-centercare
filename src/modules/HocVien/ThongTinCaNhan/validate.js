// const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const checkingEmail = regexEmail.exec(value);
// if (checkingEmail !== null) {
//   return { value };
// } else
//   return {
//     message: "Nhập sai định dạng email",
//   };
import moment from "moment";

export const validateTen = {
  required: {
    value: true,
    message: "Tên không được bỏ trống",
  },
  maxLength: {
    value: 100,
    message: "Tên không quá 100 ký tự",
  },
};
export const validateNgaySinh = {
  required: {
    value: true,
    message: "Ngày sinh không được bỏ trống",
  },
  validate: {
    nhoHon15Tuoi: (value) => {
      if (moment().diff(value) < 0) {
        return "Ngày sinh không thể là ngày trong tương lai";
      }
      if (moment().diff(value, "years") < 15) {
        return "Học viên phải từ 15 tuổi trở lên";
      }
    },
  },
};

export const validateDiaChi = {
  required: {
    value: true,
    message: "Địa chỉ không được bỏ trống",
  },
  maxLength: {
    value: 100,
    message: "Địa chỉ không quá 100 ký tự",
  },
};

export const validateEmail = {
  required: {
    value: true,
    message: "Email không được bỏ trống",
  },
  maxLength: {
    value: 50,
    message: "Email không quá 100 ký tự",
  },
  pattern: {
    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Email không hợp lệ",
  },
};

export const validateSDT = {
  required: {
    value: true,
    message: "SĐT không được bỏ trống",
  },
  maxLength: {
    value: 10,
    message: "SĐT là số có 10 chữ số",
  },
  minLength: {
    value: 10,
    message: "SĐT là số có 10 chữ số",
  },
  pattern: {
    value: /[0-9]/g,
    message: "SĐT là số có 10 chữ số",
  },
};
