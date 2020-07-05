import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import BaiTapApi from "../../../../api/BaiTapApi";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FormContext, useForm } from "react-hook-form";
import { Input, DatePicker } from "../../../../components";

const { Column } = Table;
const baiTapApi = new BaiTapApi();

function KiemTra() {
  const [baiTaps, setBaiTaps] = useState([]);
  const { idLop } = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const methods = useForm();
  const { handleSubmit, setValue, register, unregister, watch } = methods;
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getBaiTap(idLop);
    register({ name: "idBaiTap" });
    return () => {
      unregister("idBaiTap");
    };
  }, [idLop]);

  const getBaiTap = async (idLop) => {
    let res = await baiTapApi.getByIdLop(idLop);
    if (res?.success) {
      setBaiTaps(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const addHocVien = async (data) => {
    let res = await baiTapApi.add(data);
    if (res?.success) {
      getBaiTap(idLop);
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
    let res = await baiTapApi.update(data);
    if (res?.success) {
      getBaiTap(idLop);
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

  const onSubmit = (values) => {
    console.log(values);
    let data = { ...values, idLop };
    setConfirmLoading(true);
    if (values?.idBaiTap) {
      updateHocVien(data);
    } else {
      addHocVien(data);
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
        { idBaiTap: item?.idBaiTap },
        { loaibaigiao: item?.loaibaigiao },
        { ngaygiaoBT: item?.ngaygiaoBT },
        { ngayphainop: item?.ngayphainop },
        { ghichu: item?.ghichu },
      ]);
    }, 0);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Modal
          title={watch("idBaiTap") ? "Cập nhật bài tập" : "Thêm bài tập"}
          visible={visibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          confirmLoading={confirmLoading}
        >
          <FormContext {...methods}>
            <form>
              <div className="row mb-3">
                <label className="col-2 offset-2">Loại bài giao</label>
                <Input name="loaibaigiao" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ngày giao</label>
                <DatePicker name="ngaygiaoBT" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ngày phải nộp</label>
                <DatePicker name="ngayphainop" className="col-6" />
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
            onClick={() => showPopupUpdate()}
          >
            Thêm
          </Button>
        </div>
      </div>
      <Table dataSource={baiTaps} rowKey={(item) => item.idHocVien}>
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Bài tập" dataIndex="loaibaigiao" key="loaibaigiao" />

        <Column
          title="Ngày giao"
          render={(text, item) => moment(item.ngaygiaoBT).format("YYYY-MM-DD")}
        />
        <Column
          title="Ngày phải nộp"
          render={(text, item) => moment(item.ngayphainop).format("YYYY-MM-DD")}
        />
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

export default KiemTra;
