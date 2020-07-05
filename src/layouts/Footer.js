import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "home",
    };
  }

  render() {
    return (
      <div id="footer">
        <div className="footer_bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="item">
                  <p className="text">
                    <i className="fa fa-map-marker"></i>485 Hoàng Quốc Việt, Cầu
                    Giấy, Hà Nội
                  </p>
                  <p className="text">
                    <i className="fa fa-phone"></i>096.219.5439
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="item">
                  <p className="text">
                    <i className="fa fa-map-marker"></i>51A Hồ Tùng Mậu, Cầu
                    Giấy, Hà Nội
                  </p>
                  <p className="text">
                    <i className="fa fa-phone"></i>096.219.5439
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="item">
                  <p className="text">
                    <i className="fa fa-map-marker"></i>Số 155 Bạch Mai, Hai Bà
                    Trưng, Hà Nội
                  </p>
                  <p className="text">
                    <i className="fa fa-phone"></i>096.215.2228
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="item">
                  <p className="text">
                    <i className="fa fa-map-marker"></i>Số 188 Nguyễn Lương
                    Bằng, Đống Đa, Hà Nội
                  </p>
                  <p className="text">
                    <i className="fa fa-phone"></i>096.224.4496
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="item">
                  <p className="text">
                    <i className="fa fa-map-marker"></i>Số 30 ngõ 76/2 Duy Tân
                    Cầu Giấy, Hà Nội
                  </p>
                  <p className="text">
                    <i className="fa fa-phone"></i>096.219.5439
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
