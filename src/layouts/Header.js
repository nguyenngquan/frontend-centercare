import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { HomeOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "context";

class Header extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "home",
    };
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
    return (
      <Menu
        mode="horizontal"
        selectedKeys={[activeKey]}
        onClick={this.handleSelect}
      >
        <Menu.Item>
          <a href="/" className="">
            CENTER CARE
          </a>
        </Menu.Item>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Trang chủ
        </Menu.Item>
        <Menu.Item key="forum">Thông tin</Menu.Item>
        <Menu.SubMenu title="Quản lý học viên">
          <Menu.Item key="hocvien">Danh sách học viên</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="Quản lý học viên"></Menu.SubMenu>
        <Menu.Item key="nhucauhoc">Đăng ký nhu cầu học</Menu.Item>
        <Menu.Item key="lichhoc">Đăng ký lịch học</Menu.Item>
        <Menu.Item key="diemdanh">Điểm danh</Menu.Item>
        <Menu.Item key="baitapvenha">Bài tập về nhà</Menu.Item>
        <Menu.Item key="kiemtratrenlop">Kiểm tra trên lớp</Menu.Item>
        <Menu.Item key="updatedanhmuc">Câp nhật danh mục</Menu.Item>
        <Menu.SubMenu title="Nguyễn Ngọc Quân" className="float-right">
          <Menu.Item key="4">Company</Menu.Item>
          <Menu.Item key="5">Team</Menu.Item>
          <Menu.Item key="6">Contact</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item icon={<LoginOutlined />} className="float-right">
          Login
        </Menu.Item>
        <Menu.Item
          icon={<LogoutOutlined />}
          className="float-right"
          onClick={this.onLogout}
        >
          Log out
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Header);
