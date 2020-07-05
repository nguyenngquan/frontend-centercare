import React, { useState, useEffect } from "react";
import NhuCauHocApi from "../../../api/NhuCauHocApi";
import DangKyNhuCauHocApi from "../../../api/DangKyNhuCauHocApi";
import { Table, notification, Alert } from "antd";
import { Modal } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { parseToken } from "../../../common/utils";

const { Column } = Table;

function DangKyNhuCauHoc() {
  const nhuCauHocApi = new NhuCauHocApi();
  const dangKyNhuCauHocApi = new DangKyNhuCauHocApi();
  const [nhuCauHocs, setNhuCauHocs] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [mode, setMode] = useState("new");
  const [date, setDate] = useState(moment());
  useEffect(() => {
    getNhuCauHocs();
  }, []);
  const getNhuCauHocs = async () => {
    const idHocVien = parseToken().idHocVien;
    let res = await nhuCauHocApi.getByIdHocVien(idHocVien);
    if (res?.success) {
      setNhuCauHocs(res.data);
      if (res.daXepLop) {
        setMode("daxeplop");
        return;
      }
      if (res.daDangKy) {
        setMode("edit");
      } else {
        setMode("new");
      }
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };
  const dangKyNhuCauHoc = async () => {
    const idHocVien = parseToken().idHocVien;
    let data = {
      idHocVien,
      ngaydangky: date,
      idNhuCau: currentId,
    };
    let res = await dangKyNhuCauHocApi.add(data);
    if (res?.success) {
      notification.success({
        message: res.message,
        duration: 2,
      });
      getNhuCauHocs();
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };
  const xoaDangKyNhuCauHoc = async () => {
    let res = await dangKyNhuCauHocApi.delete(currentId);
    if (res?.success) {
      notification.success({
        message: res.message,
        duration: 2,
      });
      getNhuCauHocs();
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };
  const showPopupDangKy = (item) => {
    if (item.ngaydangky) {
      setDate(moment(item.ngaydangky));
    }
    setCurrentId(item.idNhuCau);
    setVisibleModal(true);
  };
  const showPopupDelete = (item) => {
    setCurrentId(item.idDKNhuCauHoc);
    setVisibleModalDelete(true);
  };
  const handleOk = () => {
    dangKyNhuCauHoc();
    setVisibleModal(false);
  };
  const handleDelete = () => {
    xoaDangKyNhuCauHoc();
    setVisibleModalDelete(false);
  };
  const handleCancel = () => setVisibleModal(false);
  const handleCancelDelete = () => setVisibleModalDelete(false);
  const onDateChange = (date, dateString) => {
    setDate(date);
  };

  if (mode === "daxeplop") {
    return (
      <div className="container pt-4">
        <h1>Đăng ký nhu cầu học</h1>
        <Alert message="Bạn đã được xếp lớp." type="info" />
      </div>
    );
  }

  return (
    <div className="container pt-4">
      <h1>Đăng ký nhu cầu học</h1>
      <Modal
        title="Chọn ngày"
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DatePicker
          value={date}
          onChange={onDateChange}
          defaultValue={moment()}
        />
      </Modal>
      <Modal
        title="Xóa đăng ký nhu cầu học"
        visible={visibleModalDelete}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        Are you sure?
      </Modal>
      <Table dataSource={nhuCauHocs} rowKey={(item) => item.idNhuCau}>
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Tên nhu cầu" dataIndex="tennhucau" key="tennhucau" />
        {mode === "new" && (
          <Column
            title="Ngày đăng ký"
            render={(text, item) =>
              moment(item.ngaydangky).format("YYYY-MM-DD")
            }
          />
        )}
        <Column
          title="Action"
          render={(text, item, index) => (
            <>
              <a className="text-primary" onClick={() => showPopupDangKy(item)}>
                {mode === "new" ? "Đăng ký" : "Sửa"}
              </a>
              {mode === "edit" && (
                <a
                  className="text-danger ml-3"
                  onClick={() => showPopupDelete(item)}
                >
                  Xóa
                </a>
              )}
            </>
          )}
        />
      </Table>
    </div>
  );
}

export default DangKyNhuCauHoc;
