import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import HocVienApi from "../../api/HocVienApi";
import { Input } from "../../components";
import { useForm, FormContext } from "react-hook-form";

function DoiMatKhau() {
  const hocVienApi = new HocVienApi();
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const { handleSubmit, watch } = methods;

  const changePassword = async (data) => {
    let res = await hocVienApi.changePassword(data);
    if (res?.success) {
      notification.success({
        message: res.message,
        duration: 2,
      });
    } else {
      notification.error({
        message: res?.message || "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onSubmit = (values) => {
    if (watch("newPassword") != watch("confirmNewPassword")) {
      notification.error({
        message: "Nhập lại mật khẩu mới không chính xác.",
        duration: 2,
      });
      return;
    }
    changePassword(values);
  };
  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4 ">Đổi mật khẩu</h3>
        <div>
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Lưu
          </Button>
        </div>
      </div>
      <FormContext {...methods}>
        <form>
          <div className="row mb-3">
            <label className="col-3 offset-2">Mật khẩu cũ</label>
            <Input type="password" name="oldPassword" className="col-6" />
          </div>
          <div className="row mb-3">
            <label className="col-3 offset-2">Mật khẩu mới</label>
            <Input type="password" name="newPassword" className="col-6" />
          </div>
          <div className="row mb-3">
            <label className="col-3 offset-2">Xác nhận mật khẩu mới</label>
            <Input
              type="password"
              name="confirmNewPassword"
              className="col-6"
            />
          </div>
        </form>
      </FormContext>
    </div>
  );
}

export default DoiMatKhau;
