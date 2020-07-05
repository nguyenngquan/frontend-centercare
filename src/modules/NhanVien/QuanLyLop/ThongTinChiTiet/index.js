import React, { useState, useEffect } from "react";
import { notification, Tabs } from "antd";
import LopApi from "../../../../api/LopApi";
import { useParams } from "react-router-dom";
import DanhSachHocVien from "./DanhSachHocVien";
import LichHoc from "./LichHoc";
import KiemTra from "./KiemTra";
import BaiTap from "./BaiTap";
import KetQuaHocTap from "./KetQuaHocTap";

const { TabPane } = Tabs;
const lopApi = new LopApi();

function ThongTinCaNhan() {
  const [thongTinLop, setThongTinLop] = useState({});
  const [activeKey, setKey] = useState(1);
  const { idLop } = useParams();

  useEffect(() => {
    getDSLop(idLop);
  }, [idLop]);
  const getDSLop = async (idLop) => {
    let res = await lopApi.getById(idLop);
    if (res?.success) {
      setThongTinLop(res.data);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onTabChange = (key) => {
    setKey(key);
  };
  return (
    <div className="container p-4">
      <h3 className="mb-4 ">
        Chi tiết lớp học - {thongTinLop?.tenlop}-{thongTinLop?.malop}
      </h3>

      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="Danh sách học viên" key="1">
          <DanhSachHocVien />
        </TabPane>
        <TabPane tab="Lịch học" key="2">
          <LichHoc />
        </TabPane>
        <TabPane tab="Bài tập" key="3">
          <BaiTap />
        </TabPane>
        <TabPane tab="Kiểm tra" key="4">
          <KiemTra />
        </TabPane>
        <TabPane tab="Kết quả học tập" key="5">
          <KetQuaHocTap activeKey={activeKey} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ThongTinCaNhan;
