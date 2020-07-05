import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import LichHocApi from "../../../../api/LichHocApi";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FormContext, useForm } from "react-hook-form";
import { Input, DatePicker } from "../../../../components";

const { Column } = Table;
const lichHocApi = new LichHocApi();

function LichHoc() {
  const [lichHocs, setLichHocs] = useState([]);
  const { idLop } = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false);
  const methods = useForm();
  const { handleSubmit, setValue, register, unregister } = methods;
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getLichHoc(idLop);
    register({ name: "idLichHoc" });
    return () => {
      unregister("idLichHoc");
    };
  }, [idLop]);

  const getLichHoc = async (idLop) => {
    let res = await lichHocApi.getByIdLop(idLop);
    if (res?.success) {
      setLichHocs(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const addHocVien = async (data) => {
    let res = await lichHocApi.add(data);
    if (res?.success) {
      getLichHoc(idLop);
      setVisibleModal(false);
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
    setConfirmLoading(false);
  };

  const updateHocVien = async (data) => {
    let res = await lichHocApi.update(data);
    if (res?.success) {
      getLichHoc(idLop);
      setVisibleModalUpdate(false);
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
    setConfirmLoading(false);
  };

  const onSubmit = (values) => {
    console.log(values);
    let data = { ...values, idLop };
    setConfirmLoading(true);
    if (values?.idLichHoc) {
      updateHocVien(data);
    } else {
      addHocVien(data);
    }
  };

  const handleOk = () => {
    handleSubmit(onSubmit)();
  };
  const handleCancel = () => setVisibleModal(false);

  const handleOkUpdate = () => {
    handleSubmit(onSubmit)();
  };
  const handleCancelUpdate = () => setVisibleModalUpdate(false);

  const showPopupInsert = () => {
    setVisibleModal(true);
    setValue([
      { idLichHoc: "" },
      { tuan: "" },
      { ngayhoc: "" },
      { cahoc: "" },
      { ghichu: "" },
    ]);
  };

  const showPopupUpdate = (item = null) => {
    setVisibleModalUpdate(true);
    setTimeout(() => {
      setValue([
        { idLichHoc: item?.idLichHoc },
        { tuan: item?.tuan },
        { ngayhoc: item?.ngayhoc },
        { cahoc: item?.cahoc },
        { ghichu: item?.ghichu },
      ]);
    }, 0);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Modal
          title={"Thêm lịch học"}
          visible={visibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          confirmLoading={confirmLoading}
        >
          <FormContext {...methods}>
            <form>
              <div className="row mb-3">
                <label className="col-2 offset-2">Tuần</label>
                <Input name="tuan" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ngày học</label>
                <DatePicker name="ngayhoc" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ca học</label>
                <Input name="cahoc" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ghi chú</label>
                <Input name="ghichu" className="col-6" />
              </div>
            </form>
          </FormContext>
        </Modal>
        <Modal
          title={"Cập nhật lịch học"}
          visible={visibleModalUpdate}
          onOk={handleOkUpdate}
          onCancel={handleCancelUpdate}
          width={1000}
          confirmLoading={confirmLoading}
        >
          <FormContext {...methods}>
            <form>
              <div className="row mb-3">
                <label className="col-2 offset-2">Tuần</label>
                <Input name="tuan" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ngày học</label>
                <DatePicker name="ngayhoc" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ca học</label>
                <Input name="cahoc" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ghi chú</label>
                <Input name="ghichu" className="col-6" />
              </div>
            </form>
          </FormContext>
        </Modal>
        <div>
          <Button
            type="primary"
            className="mb-3"
            onClick={() => showPopupInsert()}
          >
            Thêm
          </Button>
        </div>
      </div>
      <Table dataSource={lichHocs} rowKey={(item) => item.idHocVien}>
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Tuần" dataIndex="tuan" key="tuan" />

        <Column
          title="Ngày học"
          render={(text, item) => moment(item.ngayhoc).format("YYYY-MM-DD")}
        />
        <Column title="Ca" dataIndex="cahoc" key="cahoc" />
        <Column title="Ghi chú" dataIndex="ghichu" key="ghichu" />

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
    </>
  );
}

export default LichHoc;
