import React, { useState, useEffect } from "react";
import NhuCauHocApi from "../../../api/NhuCauHocApi";
import DangKyNhuCauHocApi from "../../../api/DangKyNhuCauHocApi";
import KetQuaHocTapApi from "../../../api/KetQuaHocTapApi";
import { Table, notification } from "antd";
import { Modal } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { parseToken } from "../../../common/utils";

const { Column } = Table;

function KetQuaHocTap() {
  const nhuCauHocApi = new NhuCauHocApi();
  const dangKyNhuCauHocApi = new DangKyNhuCauHocApi();
  const ketQuaHocTapApi = new KetQuaHocTapApi();
  const [nhuCauHocs, setNhuCauHocs] = useState([]);
  const [ketQuaHocTaps, setKetQuaHocTaps] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [mode, setMode] = useState("new");
  const [date, setDate] = useState(moment());
  useEffect(() => {
    getKQHTs();
  }, []);
  const getKQHTs = async () => {
    const idHocVien = parseToken().idHocVien;
    let res = await ketQuaHocTapApi.getByIdHocVien(idHocVien);
    if (res?.success) {
      setKetQuaHocTaps(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  return (
    <div className="container pt-4">
      <h1>Kết quả học tập</h1>

      <Table
        dataSource={ketQuaHocTaps}
        rowKey={(item) => item.id}
        pagination={{
          pageSizeOptions: ["1", "20", "50", "100"],
          showSizeChanger: true,
        }}
      >
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Bài kiểm tra" dataIndex="loaibaiKT" key="loaibaiKT" />
        <Column
          title="Ngày kiểm tra"
          render={(text, item) => moment(item.ngaykiemtra).format("DD-MM-YYYY")}
        />
        <Column title="Điểm" dataIndex="diem" key="diem" />
        <Column title="Ghi chú" dataIndex="ghichu" key="ghichu" />
      </Table>
    </div>
  );
}

export default KetQuaHocTap;
