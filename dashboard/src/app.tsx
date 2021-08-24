import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'antd/dist/antd.css';

import NavMenu from './nav-menu';
import PrivateRoute from './private-route';
import LoginPage from './pages/login-page';
import CustomerPage from './pages/customer-page';
import HomePage from './pages/home-page';
import { clearJwt } from './utils';

function Logout() {
  clearJwt();
  return <Redirect to="/login" />
}

export default function App(): React.ReactElement {
  return (
    <Router>
      <NavMenu />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <PrivateRoute path="/customer/:_id">
          <CustomerPage />
        </PrivateRoute>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}