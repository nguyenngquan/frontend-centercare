import React, { useState, useEffect } from "react";
import KiemTraApi from "../../../api/KiemTraApi";
import DangKyNhuCauHocApi from "../../../api/DangKyNhuCauHocApi";
import KetQuaHocTapApi from "../../../api/KetQuaHocTapApi";
import { Table, notification } from "antd";
import { Modal } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { parseToken } from "../../../common/utils";

const { Column } = Table;

function KetQuaHocTap() {
  const kiemTraApi = new KiemTraApi();
  const dangKyNhuCauHocApi = new DangKyNhuCauHocApi();
  const [nhuCauHocs, setNhuCauHocs] = useState([]);
  const [kiemTras, setKiemTras] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [mode, setMode] = useState("new");
  const [date, setDate] = useState(moment());
  useEffect(() => {
    getKiemTras();
  }, []);
  const getKiemTras = async () => {
    const idHocVien = parseToken().idHocVien;
    let res = await kiemTraApi.getByIdHocVien(idHocVien);
    if (res?.success) {
      setKiemTras(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  return (
    <div className="container pt-4">
      <h1>Bài kiểm tra</h1>

      <Table
        dataSource={kiemTras}
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
          render={(text, item) =>
            moment(moment().format("YYYY-MM-DD")).diff(
              moment(item.ngaykiemtra).format("YYYY-MM-DD"),
              "days"
            ) <= 0
              ? moment(item.ngaykiemtra).format("YYYY-MM-DD")
              : "Đã qua"
          }
        />
        <Column title="Ghi chú" dataIndex="ghichu" key="ghichu" />
      </Table>
    </div>
  );
}

export default KetQuaHocTap;
