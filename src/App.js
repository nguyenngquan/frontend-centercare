import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./modules/Login";
import { AuthContext } from "./context";
import "antd/dist/antd.css";

const loading = () => <div className="pt-3 text-center">Đang tải...</div>;

function App() {
  let token = getToken();
  const [isAuth, setAuth] = useState(token != null);

  function onLogin() {
    setAuth(true);
  }

  function onLogout() {
    localStorage.removeItem("token");
    setAuth(false);
    window.location.href = "/";
  }

  function getToken() {
    var strToken = localStorage.getItem("token");
    return strToken;
  }
  return (
    <Router>
      <AuthContext.Provider value={{ isAuth, onLogin, onLogout }}>
        {isAuth ? (
          <React.Suspense fallback={loading()}>
            <Layout />
          </React.Suspense>
        ) : (
          <React.Fragment>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Redirect to="/login" />
          </React.Fragment>
        )}
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
