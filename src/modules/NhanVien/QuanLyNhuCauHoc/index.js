import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import BaiTapApi from "../../../api/BaiTapApi";
import NhuCauHocApi from "../../../api/NhuCauHocApi";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FormContext, useForm } from "react-hook-form";
import { Input, DatePicker } from "../../../components";

const { Column } = Table;
const baiTapApi = new BaiTapApi();
const nhuCauHocApi = new NhuCauHocApi();

function KiemTra() {
  const [baiTaps, setBaiTaps] = useState([]);
  const [nhuCauHocs, setNhuCauHocs] = useState([]);
  const { idLop } = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const methods = useForm();
  const { handleSubmit, setValue, register, unregister } = methods;
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getNhuCauHocs();
    register({ name: "idNhuCau" });
    return () => {
      unregister("idNhuCau");
    };
  }, []);

  const getNhuCauHocs = async (idLop) => {
    let res = await nhuCauHocApi.getAll();
    if (res?.success) {
      setNhuCauHocs(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const addNhuCauHoc = async (data) => {
    let res = await nhuCauHocApi.add(data);
    if (res?.success) {
      getNhuCauHocs();
      setVisibleModal(false);
      notification.success({
        message: "Thêm nhu cầu học thành công.",
        duration: 2,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
    setConfirmLoading(false);
  };

  const updateNhuCauHoc = async (data) => {
    let res = await nhuCauHocApi.update(data);
    if (res?.success) {
      getNhuCauHocs();
      setVisibleModal(false);
      notification.success({
        message: "Cập nhật nhu cầu học thành công.",
        duration: 2,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }

    setConfirmLoading(false);
  };

  const onSubmit = (values) => {
    console.log(values);
    let data = { ...values };
    setConfirmLoading(true);
    if (values?.idNhuCau) {
      updateNhuCauHoc(data);
    } else {
      addNhuCauHoc(data);
    }
  };

  const handleOk = () => {
    handleSubmit(onSubmit)();
  };
  const handleCancel = () => setVisibleModal(false);

  const showPopupUpdate = (item = null) => {
    setVisibleModal(true);
    setTimeout(() => {
      setValue([{ idNhuCau: item?.idNhuCau }, { tennhucau: item?.tennhucau }]);
    }, 0);
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-end">
        <Modal
          title="Thêm nhu cầu"
          visible={visibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          confirmLoading={confirmLoading}
        >
          <FormContext {...methods}>
            <form>
              <div className="row mb-3">
                <label className="col-2 offset-2">Tên nhu cầu</label>
                <Input name="tennhucau" className="col-6" />
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
      <Table dataSource={nhuCauHocs} rowKey={(item) => item.idNhuCau}>
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Tên nhu cầu" dataIndex="tennhucau" key="tennhucau" />

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
