import React, { useState, useEffect } from "react";
import { notification, Table, Input, Button, Select } from "antd";
import DiemDanhApi from "../../../api/DiemDanhApi";
import moment from "moment";
import { useParams } from "react-router-dom";

const { Column } = Table;

const diemDanhApi = new DiemDanhApi();

function ThongTinCaNhan() {
  const [listDiemDanh, setListDiemDanh] = useState([]);
  const [daDiemDanh, setDaDiemDanh] = useState("N/A");
  const { date } = useParams();

  // Chạy hàm getByDate khi load page
  useEffect(() => {
    getByDate();
  }, []);

  // gọi api diemDanhApi.getByDate get thông tin điểm danh của ngày đó
  const getByDate = async () => {
    let res = await diemDanhApi.getByDate(date);
    if (res?.success) {
      if (res.daDiemDanh) {
        setListDiemDanh(res.data);
      } else {
        setListDiemDanh(
          res.data.map((item) => ({ ...item, ghichu: "", trangthai: "Học" }))
        );
      }
      setDaDiemDanh(res.daDiemDanh);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onNoteChange = (e, index) => {
    listDiemDanh[index].ghichu = e.target.value;
    setListDiemDanh(listDiemDanh);
  };
  const onStatusChange = (value, index) => {
    listDiemDanh[index].trangthai = value;
    setListDiemDanh(listDiemDanh);
  };

  const onSave = async () => {
    console.log(listDiemDanh);
    let res = await diemDanhApi.add(listDiemDanh);
    if (res?.success) {
      getByDate();
      notification.success({
        message: "Điểm danh thành công.",
        duration: 2,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };
  if (daDiemDanh == "N/A") return null;
  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4 ">
          {daDiemDanh ? "Kết quả điểm danh" : "Điểm danh"} ngày {date}
        </h3>
        {!daDiemDanh && listDiemDanh.length > 0 && (
          <Button type="primary" onClick={onSave}>
            Lưu
          </Button>
        )}
      </div>
      <Table
        dataSource={listDiemDanh}
        rowKey={(item) => item.id}
        pagination={{
          pageSizeOptions: ["1", "20", "50", "100"],
          showSizeChanger: true,
        }}
      >
        <Column
          title="STT"
          render={(text, item, index) => <span key={index}>{index + 1}</span>}
          dataIndex="STT"
        />
        <Column title="Tài khoản" dataIndex="taikhoanHV" />
        <Column title="Tên" dataIndex="ten" />
        <Column title="Tuần" dataIndex="tuan" />
        <Column
          title="Ngày học"
          dataIndex="ngayhoc"
          render={(text, item, index) => (
            <span key={index}>{moment(item.ngayhoc).format("DD-MM-YYYY")}</span>
          )}
        />
        <Column title="Ca học" dataIndex="cahoc" />
        <Column
          title="Ghi chú"
          dataIndex="ghichu"
          render={(text, item, index) =>
            daDiemDanh ? (
              text
            ) : (
              <Input key={index} onChange={(e) => onNoteChange(e, index)} />
            )
          }
        />
        <Column
          title="Điểm danh"
          dataIndex="trangthai"
          render={(text, item, index) =>
            daDiemDanh ? (
              text
            ) : (
              <Select
                defaultValue={item.trangthai}
                options={[
                  { value: "Học", label: "Học" },
                  { value: "Vắng", label: "Vắng" },
                ]}
                key={index}
                onChange={(value) => onStatusChange(value, index)}
              />
            )
          }
        />
      </Table>
    </div>
  );
}

export default ThongTinCaNhan;
