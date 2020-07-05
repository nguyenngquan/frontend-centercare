import React, { useState, useEffect } from "react";
import { notification, Table, Button, Select, InputNumber } from "antd";
import KetQuaHocTapApi from "../../../../api/KetQuaHocTapApi";
import moment from "moment";
import { useParams } from "react-router-dom";
import KiemTraApi from "../../../../api/KiemTraApi";

const { Column } = Table;

const ketQuaHocTapApi = new KetQuaHocTapApi();
const kiemTraApi = new KiemTraApi();

function KetQuaHocTap({ activeKey }) {
  const [listKQHT, setListKQHT] = useState([]);
  const [baiKiemTras, setBaiKiemTras] = useState([]);
  const [daCoDiem, setDaCoDiem] = useState("N/A");
  const { idLop } = useParams();

  useEffect(() => {
    if (activeKey == 5) getBaiKiemTra(idLop);
  }, [activeKey]);

  const getBaiKiemTra = async (idLop) => {
    let res = await kiemTraApi.getByIdLop(idLop);
    if (res?.success) {
      setBaiKiemTras(
        res.data.map((item) => ({
          value: item.idKiemTra,
          label: `${moment(item.ngaykiemtra).format("YYYY-MM-DD")} | ${
            item.loaibaiKT
          }`,
        }))
      );
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onScoreChange = (value, index) => {
    listKQHT[index].diem = value;
    setListKQHT(listKQHT);
  };

  const onSave = async () => {
    let res = await ketQuaHocTapApi.add(listKQHT);
    if (res?.success) {
      getKetQuaHocTap(listKQHT[0].idKiemTra, idLop);
      notification.success({
        message: "Thêm kết quả học tập thành công.",
        duration: 2,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const getKetQuaHocTap = async (idKiemTra, idLop) => {
    let res = await ketQuaHocTapApi.getKetQuaHocTap(idKiemTra, idLop);
    if (res?.success) {
      if (res.daCoDiem) {
        setListKQHT(res.data);
      } else {
        setListKQHT(res.data.map((item) => ({ ...item, diem: "", idKiemTra })));
      }
      setDaCoDiem(res.daCoDiem);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onKiemTraChange = (idKiemTra) => {
    getKetQuaHocTap(idKiemTra, idLop);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <div>
          <label className="mr-3">Chọn bài kiểm tra</label>
          <Select
            style={{ width: 200 }}
            options={baiKiemTras}
            onChange={onKiemTraChange}
          />
        </div>
        {!daCoDiem && listKQHT.length > 0 && (
          <Button type="primary" onClick={onSave}>
            Lưu
          </Button>
        )}
      </div>
      <Table
        dataSource={listKQHT}
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
        <Column
          title="Điểm"
          dataIndex="diem"
          width={100}
          render={(text, item, index) =>
            daCoDiem ? (
              text
            ) : (
              <InputNumber
                key={index}
                min={0}
                max={10}
                onChange={(value) => onScoreChange(value, index)}
              />
            )
          }
        />
      </Table>
    </>
  );
}

export default KetQuaHocTap;
