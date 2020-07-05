import React, { useState, useEffect } from "react";
import { notification, Calendar } from "antd";
import HocVienApi from "../../../api/HocVienApi";
import DiemDanhApi from "../../../api/DiemDanhApi";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const hocVienApi = new HocVienApi();
const diemDanhApi = new DiemDanhApi();

function ThongTinCaNhan() {
  const [listNgayDaDiemDanh, setListNgayDaDiemDanh] = useState([]);
  const [oldDate, setOldDate] = useState(moment());
  const history = useHistory();

  useEffect(() => {
    getListByMonthYear();
  }, []);

  const getListByMonthYear = async (
    month = moment().month(),
    year = moment().year()
  ) => {
    let res = await diemDanhApi.getListByMonthYear(month, year);
    if (res?.success) {
      let ngayDaDiemDanh = res.data.map((item) =>
        moment(item.ngayhoc).format("YYYY-MM-DD")
      );
      setListNgayDaDiemDanh(ngayDaDiemDanh);
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  function onPanelChange(value, mode) {
    // console.log(value.format("YYYY-MM-DD"), mode);
  }

  const onChange = (date) => {
    const oldMonth = oldDate.month();
    const oldYear = oldDate.year();
    const newMonth = date.month();
    const newYear = date.year();
    if (oldMonth != newMonth || oldYear != newYear) {
      getListByMonthYear(newMonth, newYear);
    }
    setOldDate(date);
  };

  const dateCellRender = (date) => {
    const day = date.format("YYYY-MM-DD");
    const da_diem_danh = listNgayDaDiemDanh.includes(day);
    return (
      <div
        className={da_diem_danh ? "custom-date da_diem_danh" : "custom-date"}
        onClick={() => history.push(`quan-ly-diem-danh/${day}`)}
      >
        {da_diem_danh && (
          <div className="ant-picker-calendar-date-value">{date.date()}</div>
        )}
      </div>
    );
  };

  const disabledDate = (date) => {
    return (
      moment(date.format("YYYY-MM-DD")).diff(
        moment().format("YYYY-MM-DD"),
        "days"
      ) > 0
    );
  };

  const headerRender = ({ value, onChange, onTypeChange }) => {
    return (
      <div className="d-flex justify-content-between">
        <div> Previous Next</div>
        <div>SelectMonth SelectYear</div>
      </div>
    );
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between">
        <h3 className="mb-4 ">Quản lý điểm danh</h3>
        <div></div>
      </div>
      <Calendar
        onPanelChange={onPanelChange}
        mode="month"
        onChange={onChange}
        dateCellRender={dateCellRender}
        disabledDate={disabledDate}
        // headerRender={headerRender}
      />
    </div>
  );
}

export default ThongTinCaNhan;
