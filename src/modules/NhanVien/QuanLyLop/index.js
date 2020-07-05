import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import HocVienApi from "../../../api/HocVienApi";
import LopApi from "../../../api/LopApi";
import { Input, DatePicker, Select } from "../../../components";
import { useForm, FormContext } from "react-hook-form";
import { objToArrObj } from "../../../common/utils";
import { Link } from "react-router-dom";
import Modal from "antd/lib/modal/Modal";
import NhomLopApi from "../../../api/NhomLopApi";
// import {
//   validateTen,
//   validateEmail,
//   validateNgaySinh,
//   validateSDT,
//   validateDiaChi,
// } from "./validate";

const { Column } = Table;
const { Option } = Select;
const hocVienApi = new HocVienApi();
const lopApi = new LopApi();
const nhomLopApi = new NhomLopApi();

function ThongTinCaNhan() {
  const methods = useForm();
  const { handleSubmit, setValue, register, unregister } = methods;
  const [dsLop, setDsLop] = useState([]);
  const [nhomLops, setnhomLops] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getDataInit();
  }, []);

  const getDataInit = async () => {
    await getLops();
    await getNhomLops();
  };

  const getLops = async () => {
    let res = await lopApi.getAll();
    if (res?.success) {
      setDsLop(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const getNhomLops = async () => {
    let res = await nhomLopApi.getAll();
    if (res?.success) {
      setnhomLops(
        res.data.map((item) => ({
          value: item.idNhom,
          label: `${item.tennhom} - ${item.manhom}`,
        }))
      );
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onSave = async (values) => {
    console.log(values);
    let res = await lopApi.add(values);
    if (res?.success) {
      getLops();
      setConfirmLoading(false);
      closeModal();
      setValue([{ tenlop: "" }, { malop: "" }, { idNhom: "" }]);
      notification.success({
        message: "Thêm lớp thành công.",
        duration: 2,
      });
    } else {
      setConfirmLoading(false);
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };
  const onSubmit = (values) => {
    setConfirmLoading(true);
    onSave(values);
  };

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const onHandleOk = async () => {
    handleSubmit(onSubmit)();
  };
  const onCancel = () => {
    closeModal();
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4 ">Danh sách lớp học</h3>
        <div>
          <Button type="primary" onClick={openModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Modal
        title="Thêm lớp học mới"
        visible={visible}
        onOk={onHandleOk}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        width={1000}
      >
        <FormContext {...methods}>
          <form>
            <div className="row mb-3">
              <label className="col-2 offset-2">Tên lớp</label>
              <Input name="tenlop" className="col-6" />
            </div>
            <div className="row mb-3">
              <label className="col-2 offset-2">Mã lớp</label>
              <Input name="malop" className="col-6" />
            </div>
            <div className="row mb-3">
              <label className="col-2 offset-2">Nhóm lớp</label>
              <Select name="idNhom" className="col-6" options={nhomLops} />
            </div>
          </form>
        </FormContext>
      </Modal>
      <Table
        dataSource={dsLop}
        rowKey={(item) => item.idLop}
        pagination={{
          pageSizeOptions: ["1", "20", "50", "100"],
          showSizeChanger: true,
        }}
      >
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Mã lớp" dataIndex="malop" key="malop" />
        <Column title="Tên lop" dataIndex="tenlop" key="tenlop" />
        <Column
          title="Action"
          render={(text, item, index) => (
            <>
              <Link className="text-primary" to={`quan-ly-lop/${item.idLop}`}>
                Chi tiết
              </Link>
            </>
          )}
        />
      </Table>
    </div>
  );
}

export default ThongTinCaNhan;
