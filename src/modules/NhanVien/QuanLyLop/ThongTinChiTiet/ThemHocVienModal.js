import React, { useEffect, useState } from "react";
import { Modal, Table, notification } from "antd";
import { Select } from "components";
import { useForm, FormContext } from "react-hook-form";
import NhuCauHocApi from "../../../../api/NhuCauHocApi";
import moment from "moment";
import DangKyNhuCauHocApi from "../../../../api/DangKyNhuCauHocApi";
import { Checkbox } from "../../../../components";
import { useParams } from "react-router-dom";
import HocVienApi from "../../../../api/HocVienApi";
const { Column } = Table;
const nhuCauHocApi = new NhuCauHocApi();
const dangKyNhuCauHocApi = new DangKyNhuCauHocApi();
const hocVienApi = new HocVienApi();

function ThemHocVienModal({ title, visible, onOk, onCancel, onSuccess }) {
  const [dsDKNhuCau, setDsDKNhuCau] = useState([]);
  const { idLop } = useParams();
  const methods = useForm();
  const { setValue, handleSubmit } = methods;
  const [dsNhuCau, setDsNhuCau] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      getDSNhuCau();
    }, 1000);
  }, []);
  useEffect(() => {
    if (visible) {
      return () => {
        setDsDKNhuCau([]);
        setValue("chonnhucau", null);
      };
    }
  }, [visible]);
  const getDSNhuCau = async () => {
    let res = await nhuCauHocApi.getAll();
    if (res?.success) {
      setDsNhuCau(
        res.data.map((item) => ({
          label: item.tennhucau,
          value: item.idNhuCau,
        }))
      );
    }
    // console.log(res.data);
  };
  const getDSDKNhuCau = async (id) => {
    let res = await dangKyNhuCauHocApi.getByIdNhuCau(id);
    if (res?.success && res?.data) {
      setDsDKNhuCau(res.data);
    } else {
      setDsDKNhuCau([]);
      notification.warning({
        message: res?.message || "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const addHocVienVaoLop = async (idHocViens, idDKs) => {
    const obj = {
      idLop,
      idHocViens: idHocViens.join(","),
      idDKs: idDKs.join(","),
    };
    let res = await hocVienApi.themVaoLop(obj);
    if (res?.success) {
      onSuccess();
      notification.success({
        message: "Đã thêm học viên vào lớp.",
        duration: 2,
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra, vui lòng thử lại.",
        duration: 2,
      });
    }
  };

  const onSubmit = (values) => {
    let idHocViens = [];
    let idDKs = [];
    for (let key in values) {
      if (values[key] === true) {
        const [idDK, idHocVien] = key.split("_");
        idHocViens.push(idHocVien);
        idDKs.push(idDK);
      }
    }
    if (idHocViens.length > 0) addHocVienVaoLop(idHocViens, idDKs);
  };

  const onHandleOk = () => {
    onOk();
    handleSubmit(onSubmit)();
  };
  return (
    <FormContext {...methods}>
      <form>
        <Modal
          title={title}
          visible={visible}
          onOk={onHandleOk}
          onCancel={onCancel}
          width={1000}
        >
          <div className="row">
            <label className="col-4">Chọn nhu cầu học</label>
            <Select
              name="chonnhucau"
              options={dsNhuCau}
              onChange={(id) => getDSDKNhuCau(id)}
              className="col-4"
            />
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <Table dataSource={dsDKNhuCau} rowKey={(item) => item.idHocVien}>
                <Column title="STT" render={(text, item, index) => index + 1} />
                <Column title="Tên học viên" dataIndex="ten" key="ten" />

                <Column
                  title="Ngày đăng ký"
                  render={(text, item) =>
                    moment(item.ngaydangky).format("YYYY-MM-DD")
                  }
                />
                <Column
                  title="Action"
                  render={(text, item, index) => (
                    <Checkbox
                      name={`${item.idDKNhuCauHoc}_${item.idHocVien}`}
                      className="text-danger ml-3"
                      // onClick={() => showPopupDelete(item)}
                    />
                  )}
                />
              </Table>
            </div>
          </div>
        </Modal>
      </form>
    </FormContext>
  );
}

export default ThemHocVienModal;
