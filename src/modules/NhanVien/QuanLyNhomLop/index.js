import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import BaiTapApi from "../../../api/BaiTapApi";
import NhomLopApi from "../../../api/NhomLopApi";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FormContext, useForm } from "react-hook-form";
import { Input, DatePicker } from "../../../components";

const { Column } = Table;
const baiTapApi = new BaiTapApi();
const nhomLopApi = new NhomLopApi();

function KiemTra() {
  const [baiTaps, setBaiTaps] = useState([]);
  const [nhomLops, setNhomLops] = useState([]);
  const { idLop } = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const methods = useForm();
  const { handleSubmit, setValue, register, unregister } = methods;
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getNhomLops();
    register({ name: "idNhom" });
    return () => {
      unregister("idNhom");
    };
  }, []);

  const getNhomLops = async (idLop) => {
    let res = await nhomLopApi.getAll();
    if (res?.success) {
      setNhomLops(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const addNhomLop = async (data) => {
    let res = await nhomLopApi.add(data);
    getNhomLops();
    setVisibleModal(false);
    notification.success({
      message: "Thêm nhóm lớp thành công.",
      duration: 2,
    });
    setConfirmLoading(false);
  };

  const updateNhomLop = async (data) => {
    let res = await nhomLopApi.update(data);
    getNhomLops();
    setVisibleModal(false);
    notification.success({
      message: "Cập nhật nhóm lớp thành công.",
      duration: 2,
    });

    setConfirmLoading(false);
  };

  const onSubmit = (values) => {
    console.log(values);
    let data = { ...values };
    setConfirmLoading(true);
    if (values?.idNhom) {
      updateNhomLop(data);
    } else {
      addNhomLop(data);
    }
  };

  const handleOk = () => {
    handleSubmit(onSubmit)();
  };
  const handleCancel = () => setVisibleModal(false);

  const showPopupUpdate = (item = null) => {
    setVisibleModal(true);
    setTimeout(() => {
      setValue([
        { idNhom: item?.idNhom },
        { manhom: item?.manhom },
        { tennhom: item?.tennhom },
      ]);
    }, 0);
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-end">
        <Modal
          title="Thêm nhóm lớp"
          visible={visibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          confirmLoading={confirmLoading}
        >
          <FormContext {...methods}>
            <form>
              <div className="row mb-3">
                <label className="col-2 offset-2">Mã nhóm</label>
                <Input name="manhom" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Tên nhóm</label>
                <Input name="tennhom" className="col-6" />
              </div>
            </form>
          </FormContext>
        </Modal>
        <div>
          <Button
            type="primary"
            className="mb-3"
            onClick={() => showPopupUpdate()}
          >
            Thêm
          </Button>
        </div>
      </div>
      <Table dataSource={nhomLops} rowKey={(item) => item.idNhom}>
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Mã nhóm" dataIndex="manhom" key="manhom" />
        <Column title="Tên nhóm" dataIndex="tennhom" key="tennhom" />

        <Column
          title="Action"
          render={(text, item, index) => (
            <a
              className="text-danger ml-3"
              onClick={() => showPopupUpdate(item)}
            >
              Sửa
            </a>
          )}
        />
      </Table>
    </div>
  );
}

export default KiemTra;
