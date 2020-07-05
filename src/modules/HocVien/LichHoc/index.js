import React, { useState, useEffect } from "react";
import LichHocApi from "../../../api/LichHocApi";
import { Table, notification } from "antd";
import { Modal } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { parseToken } from "../../../common/utils";

const { Column } = Table;

function KetQuaHocTap() {
  const lichHocApi = new LichHocApi();

  const [lichHocs, setLichHocs] = useState([]);
  //   const [visibleModal, setVisibleModal] = useState(false);
  //   const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  //   const [currentId, setCurrentId] = useState();
  //   const [date, setDate] = useState(moment());

  useEffect(() => {
    getLichHocs();
  }, []);

  const getLichHocs = async () => {
    const idHocVien = parseToken().idHocVien;
    let res = await lichHocApi.getByIdHocVien(idHocVien);
    if (res?.success) {
      setLichHocs(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  return (
    <div className="container pt-4">
      <h1>Lịch học</h1>

      <Table
        dataSource={lichHocs}
        rowKey={(item) => item.id}
        pagination={{
          pageSizeOptions: ["1", "20", "50", "100"],
          showSizeChanger: true,
        }}
      >
        <Column title="STT" render={(text, item, index) => index + 1} />
        <Column title="Tuần" dataIndex="tuan" key="tuan" />
        <Column
          title="Ngày"
          render={(text, item) => moment(item.ngayhoc).format("YYYY-MM-DD")}
        />
        <Column title="Ca" dataIndex="cahoc" key="cahoc" />
        <Column title="Ghi chú" dataIndex="ghichu" key="ghichu" />
      </Table>
    </div>
  );
}

export default KetQuaHocTap;
