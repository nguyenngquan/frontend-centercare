import React, { useState, useEffect } from "react";
import { Table, Button, notification, Tabs } from "antd";
import LopApi from "../../../../api/LopApi";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
// import {
//   validateTen,
//   validateEmail,
//   validateNgaySinh,
//   validateSDT,
//   validateDiaChi,
// } from "./validate";
import moment from "moment";
import ThemHocVienModal from "./ThemHocVienModal";
import HocVienApi from "../../../../api/HocVienApi";

const { TabPane } = Tabs;
const { Column } = Table;
const lopApi = new LopApi();
const hocVienApi = new HocVienApi();

function DanhSachHocVien() {
  const [thongTinLop, setThongTinLop] = useState({});
  const { idLop } = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  useEffect(() => {
    getDSLop(idLop);
  }, [idLop]);
  const getDSLop = async (idLop) => {
    let res = await lopApi.getById(idLop);
    if (res?.success) {
      setThongTinLop(res.data);
    }
    // console.log(res.data);
  };
  const deleteHocVien = async (id) => {
    let res = await hocVienApi.xoaKhoiLop(id);
    if (res?.success) {
      getDSLop(idLop);
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
  const showPopupDangKy = (item) => {
    setVisibleModal(true);
  };
  const handleOk = () => {
    setVisibleModal(false);
  };
  const handleCancel = () => setVisibleModal(false);

  const showPopupDelete = (item) => {
    setVisibleModalDelete(true);
    setIdDelete(item.idHocVien);
  };
  const handleOkDelete = () => {
    deleteHocVien(idDelete);
    setVisibleModalDelete(false);
  };
  const handleCancelDelete = () => setVisibleModalDelete(false);
  const onTabChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <div className="d-flex justify-content-end">
        <ThemHocVienModal
          title="Chọn học viên"
          visible={visibleModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          onSuccess={() => getDSLop(idLop)}
        ></ThemHocVienModal>
        <Modal
          title="Xóa học viên"
          visible={visibleModalDelete}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
        >
          Bạn có chắc chắn muốn xóa học viên này khỏi lớp không?
        </Modal>
        <div>
          <Button
            type="primary"
            className="mb-3"
            onClick={() => showPopupDangKy()}
          >
            Thêm
          </Button>
        </div>
      </div>
      <Table
        dataSource={thongTinLop.danhSachLop}
        rowKey={(item) => item.idHocVien}
      >
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Tên học viên" dataIndex="ten" key="ten" />

        <Column
          title="Ngày đăng ký"
          render={(text, item) => moment(item.ngaydangky).format("YYYY-MM-DD")}
        />
        <Column
          title="Action"
          render={(text, item, index) => (
            <a
              className="text-danger ml-3"
              onClick={() => showPopupDelete(item)}
            >
              Xóa
            </a>
          )}
        />
      </Table>
    </>
  );
}

export default DanhSachHocVien;
