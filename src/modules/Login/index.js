import React, { useContext } from "react";
import { useForm, Controller, FormContext } from "react-hook-form";
import { Input } from "../../components";
import { Button } from "antd";
import { validateUserName } from "./validate";
import { login } from "../../api/AuthenApi";
import { AuthContext } from "context";
import { useHistory } from "react-router-dom";

function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });
  const { handleSubmit, errors, watch } = methods;
  const onSubmit = async (values) => {
    let res = await login(values.username, values.password);
    if (res?.status === "success") {
      localStorage.setItem("token", res.token);
      context.onLogin();
      history.push("/");
    } else {
      console.log(res.message);
    }
  };
  return (
    <div className="login-wrapper">
      <FormContext {...methods}>
        <form>
          <Input name="username" validate={validateUserName} type="email" />
          <Input name="password" type="password" />
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Login
          </Button>
        </form>
      </FormContext>
    </div>
  );
}

export default Login;
