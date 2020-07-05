import React, { useState, useEffect } from "react";
import BaiTapApi from "../../../api/BaiTapApi";
import DangKyNhuCauHocApi from "../../../api/DangKyNhuCauHocApi";
import KetQuaHocTapApi from "../../../api/KetQuaHocTapApi";
import { Table, notification } from "antd";
import { Modal } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { parseToken } from "../../../common/utils";

const { Column } = Table;

function KetQuaHocTap() {
  const baiTapApi = new BaiTapApi();
  const dangKyNhuCauHocApi = new DangKyNhuCauHocApi();
  const [nhuCauHocs, setNhuCauHocs] = useState([]);
  const [baiTaps, setBaiTaps] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [mode, setMode] = useState("new");
  const [date, setDate] = useState(moment());
  useEffect(() => {
    getBaiTaps();
  }, []);
  const getBaiTaps = async () => {
    const idHocVien = parseToken().idHocVien;
    let res = await baiTapApi.getByIdHocVien(idHocVien);
    if (res?.success) {
      setBaiTaps(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  return (
    <div className="container pt-4">
      <h1>Bài tập về nhà</h1>

      <Table
        dataSource={baiTaps}
        rowKey={(item) => item.id}
        pagination={{
          pageSizeOptions: ["1", "20", "50", "100"],
          showSizeChanger: true,
        }}
      >
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Bài tập" dataIndex="loaibaigiao" key="loaibaigiao" />
        <Column
          title="Ngày giao"
          render={(text, item) => moment(item.ngaygiaoBT).format("DD-MM-YYYY")}
        />
        <Column
          title="Ngày phải nộp"
          render={(text, item) =>
            moment().diff(moment(item.ngayphainop)) < 0
              ? moment(item.ngayphainop).format("DD-MM-YYYY")
              : "Đã qua"
          }
        />
        <Column title="Ghi chú" dataIndex="ghichu" key="ghichu" />
      </Table>
    </div>
  );
}

export default KetQuaHocTap;
