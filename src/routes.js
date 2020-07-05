import React from "react";

const Home = React.lazy(() => import("./modules/Home"));
const DangKyNhuCauHoc = React.lazy(() =>
  import("./modules/HocVien/DangKyNhuCauHoc")
);
const ThongTinCaNhan = React.lazy(() =>
  import("./modules/HocVien/ThongTinCaNhan")
);
const KetQuaHocTap = React.lazy(() => import("./modules/HocVien/KetQuaHocTap"));
const KiemTra = React.lazy(() => import("./modules/HocVien/KiemTra"));
const BaiTap = React.lazy(() => import("./modules/HocVien/BaiTap"));
const LichHoc = React.lazy(() => import("./modules/HocVien/LichHoc"));
const QuanLyHocVien = React.lazy(() =>
  import("./modules/NhanVien/QuanLyHocVien")
);
const QuanLyLop = React.lazy(() => import("./modules/NhanVien/QuanLyLop"));
const QuanLyLop_ChiTiet = React.lazy(() =>
  import("./modules/NhanVien/QuanLyLop/ThongTinChiTiet")
);
const QuanLyDiemDanh = React.lazy(() =>
  import("./modules/NhanVien/QuanLyDiemDanh")
);
const QuanLyNhomLop = React.lazy(() =>
  import("./modules/NhanVien/QuanLyNhomLop")
);
const QuanLyNhuCauHoc = React.lazy(() =>
  import("./modules/NhanVien/QuanLyNhuCauHoc")
);

const NgayChiTiet = React.lazy(() =>
  import("./modules/NhanVien/QuanLyDiemDanh/NgayChiTiet")
);
const DoiMatKhau = React.lazy(() => import("./modules/DoiMatKhau"));

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  {
    path: "/dang-ky-nhu-cau-hoc",
    exact: true,
    name: "DkNhucauhoc",
    component: DangKyNhuCauHoc,
  },
  {
    path: "/thong-tin-ca-nhan",
    exact: true,
    name: "Thongtincanhan",
    component: ThongTinCaNhan,
  },
  {
    path: "/ket-qua-hoc-tap",
    exact: true,
    name: "KQHT",
    component: KetQuaHocTap,
  },
  {
    path: "/kiem-tra",
    exact: true,
    name: "Kiemtra",
    component: KiemTra,
  },
  {
    path: "/bai-tap",
    exact: true,
    name: "Baitap",
    component: BaiTap,
  },
  {
    path: "/lich-hoc",
    exact: true,
    name: "Baitap",
    component: LichHoc,
  },
  {
    path: "/quan-ly/quan-ly-lop",
    exact: true,
    name: "QLL",
    component: QuanLyLop,
  },
  {
    path: "/quan-ly/quan-ly-lop/:idLop",
    exact: true,
    name: "QLLCT",
    component: QuanLyLop_ChiTiet,
  },
  {
    path: "/quan-ly/quan-ly-diem-danh",
    exact: true,
    name: "QLDD",
    component: QuanLyDiemDanh,
  },
  {
    path: "/quan-ly/quan-ly-diem-danh/:date",
    exact: true,
    name: "QLDDByDate",
    component: NgayChiTiet,
  },
  {
    path: "/quan-ly/quan-ly-hoc-vien",
    exact: true,
    name: "QLHV",
    component: QuanLyHocVien,
  },
  {
    path: "/quan-ly/quan-ly-nhom-lop",
    exact: true,
    name: "QLNL",
    component: QuanLyNhomLop,
  },
  {
    path: "/quan-ly/quan-ly-nhu-cau-hoc",
    exact: true,
    name: "QLNCH",
    component: QuanLyNhuCauHoc,
  },
  {
    path: "/doi-mat-khau",
    exact: true,
    name: "DoiMatKhau",
    component: DoiMatKhau,
  },
];

export default routes;
