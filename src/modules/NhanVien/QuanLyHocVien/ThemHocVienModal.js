import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { FormContext, useForm } from "react-hook-form";
import { Input, DatePicker, Select } from "../../../components";
import { Button, notification } from "antd";
import HocVienApi from "../../../api/HocVienApi";

const hocVienApi = new HocVienApi();

const selectOptions = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
  { value: "Khác", label: "Khác" },
];

function ThemHocVienModal({ onSuccess }) {
  const methods = useForm();
  const { handleSubmit, setError, clearError, errors } = methods;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addHocVien = async (data) => {
    let res = await hocVienApi.add(data);
    if (res?.success) {
      notification.success({
        message: "Đã thêm học viên mới.",
        duration: 2,
      });
      closeModal();
      onSuccess();
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
    setConfirmLoading(false);
  };

  const checkTrung = async (taikhoanHV) => {
    let res = await hocVienApi.getByTKHV(taikhoanHV);
    if (res?.success) {
      if (res.daTonTai) {
        setError(
          "taikhoanHV",
          "isDuplicate",
          "Tên tài khoản này đã tồn tại, vui lòng chọn tên tài khoản khác."
        );
      } else {
        clearError("taikhoanHV");
      }
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
    setConfirmLoading(false);
  };

  const onChange = (e) => {
    checkTrung(e.target.value);
  };

  const onSubmit = (values) => {
    setConfirmLoading(true);
    addHocVien(values);
  };

  const onOk = () => {
    if (Object.keys(errors).length > 0) return;
    handleSubmit(onSubmit)();
  };

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <div>
      <Button type="primary" onClick={openModal}>
        Thêm mới
      </Button>
      <Modal
        title="Thêm học viên"
        visible={visible}
        onOk={onOk}
        onCancel={closeModal}
        confirmLoading={confirmLoading}
        width={700}
      >
        <FormContext {...methods}>
          <form>
            <div className="row mb-3">
              <label className="col-3 offset-1">Tên học viên</label>
              <Input className="col-6" name="ten" />
            </div>
            <div className="row mb-3">
              <label className="col-3 offset-1">Tài khoản</label>
              <Input className="col-6" name="taikhoanHV" onChange={onChange} />
            </div>
            <div className="row mb-3">
              <label className="col-3 offset-1">Mật khẩu</label>
              <Input className="col-6" name="matkhauHV" />
            </div>
            <div className="row mb-3">
              <label className="col-3 offset-1">Giới tính</label>
              <Select
                className="col-6"
                name="gioitinh"
                options={selectOptions}
              />
            </div>
            <div className="row mb-3">
              <label className="col-3 offset-1">Ngày sinh</label>
              <DatePicker className="col-6" name="ngaysinh" />
            </div>
            <div className="row mb-3">
              <label className="col-3 offset-1">Địa chỉ</label>
              <Input className="col-6" name="diachi" />
            </div>
            <div className="row mb-3">
              <label className="col-3 offset-1">Điện thoại</label>
              <Input className="col-6" name="dienthoai" />
            </div>
            <div className="row mb-3">
              <label className="col-3 offset-1">Email</label>
              <Input className="col-6" name="email" />
            </div>
          </form>
        </FormContext>
      </Modal>
    </div>
  );
}

export default ThemHocVienModal;
