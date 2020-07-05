import React, { useState, useEffect } from "react";
import { Table, Button, notification } from "antd";
import KiemTraApi from "../../../../api/KiemTraApi";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FormContext, useForm } from "react-hook-form";
import { Input, DatePicker } from "../../../../components";

const { Column } = Table;
const kiemTraApi = new KiemTraApi();

function KiemTra() {
  const [baiKiemTras, setBaiKiemTras] = useState([]);
  const { idLop } = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const methods = useForm();
  const { handleSubmit, setValue, register, unregister } = methods;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getBaiKiemTra(idLop);
    // đang ký field idKiemTra vào form values của react-hook-form, tác dụng như 1 field ẩn ko hiển thị trên UI
    register({ name: "idKiemTra" });

    // hàm return chạy ở lần useEffect tiếp theo để clean up (ở đây cụ thể là xóa đăng ký field idKiemTra)
    return () => {
      unregister("idKiemTra");
    };
  }, [idLop]);

  const getBaiKiemTra = async (idLop) => {
    let res = await kiemTraApi.getByIdLop(idLop);
    if (res?.success) {
      setBaiKiemTras(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const addHocVien = async (data) => {
    let res = await kiemTraApi.add(data);
    if (res?.success) {
      getBaiKiemTra(idLop);
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
    let res = await kiemTraApi.update(data);
    if (res?.success) {
      getBaiKiemTra(idLop);
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
    let data = { ...values, idLop };
    setConfirmLoading(true);
    if (values?.idKiemTra) {
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
    console.log(item);
    if (item?.idKiemTra) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
    setTimeout(() => {
      setValue([
        { idKiemTra: item?.idKiemTra },
        { loaibaiKT: item?.loaibaiKT },
        { ngaykiemtra: item?.ngaykiemtra },
        { ghichu: item?.ghichu },
      ]);
    }, 0);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Modal
          title={isUpdate ? "Cập nhật bài kiểm tra" : "Thêm bài kiểm tra"}
          visible={visibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          confirmLoading={confirmLoading}
        >
          <FormContext {...methods}>
            <form>
              <div className="row mb-3">
                <label className="col-2 offset-2">Loại bài kiểm tra</label>
                <Input name="loaibaiKT" className="col-6" />
              </div>
              <div className="row mb-3">
                <label className="col-2 offset-2">Ngày kiểm tra</label>
                <DatePicker name="ngaykiemtra" className="col-6" />
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
      <Table dataSource={baiKiemTras} rowKey={(item) => item.idHocVien}>
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Bài kiểm tra" dataIndex="loaibaiKT" key="loaibaiKT" />

        <Column
          title="Ngày kiểm tra"
          render={(text, item) => moment(item.ngaykiemtra).format("YYYY-MM-DD")}
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
