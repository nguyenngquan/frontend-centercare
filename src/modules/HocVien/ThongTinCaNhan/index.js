import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import HocVienApi from "../../../api/HocVienApi";
import { Input, DatePicker, Select } from "../../../components";
import { useForm, FormContext } from "react-hook-form";
import { objToArrObj } from "../../../common/utils";
import {
  validateTen,
  validateEmail,
  validateNgaySinh,
  validateSDT,
  validateDiaChi,
} from "./validate";

const { Column } = Table;
const { Option } = Select;

const selectOptions = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
  { value: "Khác", label: "Khác" },
];
function ThongTinCaNhan() {
  const hocVienApi = new HocVienApi();
  const methods = useForm();
  const { handleSubmit, setValue, register, unregister } = methods;
  const [dsLop, setDsLop] = useState([]);

  useEffect(() => {
    getHocVien();
    register({ name: "idHocVien" });
    return () => {
      unregister("idHocVien");
    };
  }, []);
  const getHocVien = async () => {
    let res = await hocVienApi.getMyInfo();
    if (res?.data) {
      setValue(objToArrObj(res.data));
      setDsLop([{ value: res.data.idLop, label: res.data.tenlop }]);
    }
  };
  const updateHocVien = async (data) => {
    let res = await hocVienApi.update(data);
    if (res?.success) {
      notification.success({
        message: res.message,
        duration: 2,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onSubmit = (values) => {
    updateHocVien(values);
    console.log(values);
  };
  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4 ">Thông tin cá nhân</h3>
        <div>
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Lưu
          </Button>
        </div>
      </div>
      <FormContext {...methods}>
        <form>
          <div className="row mb-3">
            <label className="col-2 offset-2">Tài khoản</label>
            <Input name="taikhoanHV" className="col-6" disabled />
          </div>
          <div className="row mb-3">
            <label className="col-2 offset-2">Tên</label>
            <Input name="ten" className="col-6" validate={validateTen} />
          </div>
          <div className="row mb-3">
            <label className="col-2 offset-2">Giới tính</label>
            <Select name="gioitinh" className="col-6" options={selectOptions} />
          </div>
          <div className="row mb-3">
            <label className="col-2 offset-2">Ngày sinh</label>
            <DatePicker name="ngaysinh" validate={validateNgaySinh} />
          </div>
          <div className="row mb-3">
            <label className="col-2 offset-2">Địa chỉ</label>
            <Input name="diachi" className="col-6" validate={validateDiaChi} />
          </div>
          <div className="row mb-3">
            <label className="col-2 offset-2">E-mail</label>
            <Input name="email" className="col-6" validate={validateEmail} />
          </div>
          <div className="row mb-3">
            <label className="col-2 offset-2">Điện thoại</label>
            <Input name="dienthoai" className="col-6" validate={validateSDT} />
          </div>
          <div className="row mb-3">
            <label className="col-2 offset-2">Lớp</label>
            <Select disabled name="idLop" className="col-6" options={dsLop} />
          </div>
        </form>
      </FormContext>
    </div>
  );
}

export default ThongTinCaNhan;
