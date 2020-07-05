import React, { useState, useEffect } from "react";
import HocVienApi from "../../../api/HocVienApi";
import { notification, Table } from "antd";
import moment from "moment";
import Modal from "antd/lib/modal/Modal";
import ThemHocVienModal from "./ThemHocVienModal";

const hocVienApi = new HocVienApi();

const { Column } = Table;

function QuanLyHocVien() {
  const [listHocVien, setListHocVien] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idHocVienDelete, setIdHocVienDelete] = useState(false);

  useEffect(() => {
    getAllHocVien();
  }, []);

  const getAllHocVien = async () => {
    let res = await hocVienApi.getAll();
    if (res?.success) {
      setListHocVien(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const deleteHocVien = async () => {
    closeDeleteModal();
    let res = await hocVienApi.delete(idHocVienDelete);
    if (res?.success) {
      getAllHocVien();
      notification.success({
        message: "Đã xóa học viên.",
        duration: 2,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const openDeleteModal = (idHocVien) => {
    setIdHocVienDelete(idHocVien);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between">
        <h3>Quản lý học viên</h3>
        <div>
          <ThemHocVienModal onSuccess={getAllHocVien} />
        </div>
      </div>
      <Modal
        title="Xóa học viên"
        visible={showDeleteModal}
        onOk={deleteHocVien}
        onCancel={closeDeleteModal}
      >
        Bạn có chắc muốn xóa học viên này không?
      </Modal>
      <Table dataSource={listHocVien}>
        <Column
          title="STT"
          render={(value, row, index) => index + 1}
          width={80}
          align="center"
        />
        <Column title="Tài khoản" dataIndex="taikhoanHV" key="taikhoanHV" />
        <Column title="Tên" dataIndex="ten" key="ten" />
        <Column title="Giới tính" dataIndex="gioitinh" key="gioitinh" />
        <Column
          title="Ngày sinh"
          dataIndex="ngaysinh"
          key="ngaysinh"
          render={(value) => moment(value).format("YYYY-MM-DD")}
        />
        <Column title="Địa chỉ" dataIndex="diachi" key="diachi" />
        <Column title="Điện thoại" dataIndex="dienthoai" key="dienthoai" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Action"
          dataIndex="idHocVien"
          render={(value) => (
            <a href="javascript:;" onClick={() => openDeleteModal(value)}>
              Xóa
            </a>
          )}
        />
      </Table>
    </div>
  );
}

export default QuanLyHocVien;
