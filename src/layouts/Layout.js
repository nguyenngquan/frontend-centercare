import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes";
import Footer from "./Footer";

function Layout(props) {
  const [height, setHeight] = useState(291);
  useEffect(() => {
    setTimeout(() => {
      let headerHeight = document.getElementById("header").clientHeight;
      let footerHeight = document.getElementById("footer").clientHeight;
      setHeight(headerHeight + footerHeight + 1);
    }, 50);
  }, []);
  return (
    <React.Fragment>
      <Header />
      <div
        id="content"
        style={{ minHeight: `calc(100vh - ${height}px)`, position: "relative" }}
      >
        <Switch>
          {routes.map(({ component: Component, ...rest }, index) => (
            <Route
              {...rest}
              key={"routes-" + index}
              render={(props) => <Component {...props} />}
            />
          ))}
          <Redirect from="/home" to="/" />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
