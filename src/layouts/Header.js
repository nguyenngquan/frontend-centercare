import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import {
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AuthContext } from "context";
import { parseToken } from "../common/utils";

class Header extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "home",
    };
    this.token = parseToken();
    this.username = localStorage.getItem("username");
  }

  handleSelect = (e) => {
    this.setState({ activeKey: e.key });
    this.props.history.push(e.key);
  };

  onLogout = () => {
    this.context.onLogout();
  };

  render() {
    const { activeKey } = this.state;
    const isNhanVien = this.token.role === "NV";
    return (
      <Menu
        mode="horizontal"
        selectedKeys={[activeKey]}
        onClick={this.handleSelect}
        id="header"
      >
        <Menu.Item>
          <a href="/" className="">
            CENTER CARE
          </a>
        </Menu.Item>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Trang chủ
        </Menu.Item>
        {!isNhanVien && (
          <Menu.Item key="/dang-ky-nhu-cau-hoc">Đăng ký nhu cầu học</Menu.Item>
        )}
        {!isNhanVien && <Menu.Item key="/lich-hoc">Lịch học</Menu.Item>}
        {!isNhanVien && <Menu.Item key="/bai-tap">Bài tập</Menu.Item>}
        {!isNhanVien && <Menu.Item key="/kiem-tra">Kiểm tra</Menu.Item>}
        {!isNhanVien && (
          <Menu.Item key="/ket-qua-hoc-tap">Kết quả học tập</Menu.Item>
        )}
        {isNhanVien && (
          <Menu.Item key="/quan-ly/quan-ly-hoc-vien">
            Quản lý học viên
          </Menu.Item>
        )}
        {isNhanVien && (
          <Menu.Item key="/quan-ly/quan-ly-lop">Quản lý lớp</Menu.Item>
        )}
        {isNhanVien && (
          <Menu.SubMenu title="Quản lý danh mục">
            <Menu.Item key="/quan-ly/quan-ly-nhom-lop">
              Quản lý nhóm lớp
            </Menu.Item>
            <Menu.Item key="/quan-ly/quan-ly-nhu-cau-hoc">
              Quản lý nhu cầu học
            </Menu.Item>
          </Menu.SubMenu>
        )}
        {isNhanVien && (
          <Menu.Item key="/quan-ly/quan-ly-diem-danh">Điểm danh</Menu.Item>
        )}

        <Menu.SubMenu
          title={`Xin chào, ${this.username}`}
          className="float-right"
        >
          {!isNhanVien && (
            <Menu.Item icon={<UserOutlined />} key="/thong-tin-ca-nhan">
              Thông tin cá nhân
            </Menu.Item>
          )}
          <Menu.Item icon={<KeyOutlined />} key="/doi-mat-khau">
            Đổi mật khẩu
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} onClick={this.onLogout}>
            Log out
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default withRouter(Header);
