import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'antd/dist/antd.css';

import PrivateRoute from './private-route';
import { clearJwt } from './utils';

import NavMenu from './nav-menu';
import LoginPage from './pages/login-page/lazy';
import CustomerPage from './pages/customer-page/lazy';
import HomePage from './pages/home-page/lazy';

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