import React from "react";
import Header from "./Header";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes";
import Footer from "./Footer";

function Layout(props) {
  return (
    <React.Fragment>
      <Header />
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
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
