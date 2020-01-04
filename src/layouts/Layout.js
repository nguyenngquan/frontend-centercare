import React from 'react';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';

function Layout(props) {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        {routes.map(({ component: Component, ...rest }, index) => (
          <Route {...rest} key={'routes-' + index} render={props => (
            <Component {...props} />
          )} />
        ))}
      </Switch>
    </React.Fragment>
  )
}

export default Layout;