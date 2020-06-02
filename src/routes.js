import React from "react";

const Home = React.lazy(() => import("./modules/Home"));
const Forum = React.lazy(() => import("./modules/Forum"));
const DangKyNhuCauHoc = React.lazy(() =>
  import("./modules/HocVien/DangKyNhuCauHoc")
);

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/forum", exact: true, name: "Forum", component: Forum },
  {
    path: "/dang-ky-nhu-cau-hoc",
    exact: true,
    name: "Forum",
    component: DangKyNhuCauHoc,
  },
];

export default routes;
