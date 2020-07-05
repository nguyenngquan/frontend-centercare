import React, { useContext, useState } from "react";
import { useForm, Controller, FormContext } from "react-hook-form";
import { Input, Checkbox } from "../../components";
import { Button, Tabs, Card, Alert } from "antd";
import { validateUserName } from "./validate";
import { login } from "../../api/AuthenApi";
import { AuthContext } from "context";
import { useHistory } from "react-router-dom";

const tabListNoTitle = [
  {
    key: "hv",
    tab: "Học viên",
  },
  {
    key: "nv",
    tab: "Nhân viên",
  },
];

function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });
  const { handleSubmit, errors, watch } = methods;
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values) => {
    let res = await login(values.username, values.password, values.isNhanVien);
    if (res?.success) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);
      context.onLogin();
      history.push("/");
    } else {
      setErrorMessage(res?.message);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="site-card-border-less-wrapper">
        <Card
          title={<h4>Đăng nhập</h4>}
          bordered={false}
          style={{ width: 700 }}
        >
          <FormContext {...methods}>
            <form>
              {errorMessage && (
                <Alert message={errorMessage} className="mb-3" type="warning" />
              )}
              <label>Tài khoản</label>
              <Input name="username" validate={validateUserName} type="email" />
              <label>Mật khẩu</label>
              <Input
                name="password"
                type="password"
                onPressEnter={handleSubmit(onSubmit)}
              />
              <Checkbox name="isNhanVien" className="d-block mt-3">
                Bạn là nhân viên?
              </Checkbox>
              <Button
                className="mt-3"
                size="large"
                type="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
            </form>
          </FormContext>
        </Card>
      </div>
    </div>
  );
}

export default Login;
