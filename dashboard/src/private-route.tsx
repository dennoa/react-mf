import React from 'react';
import { Route, Redirect } from "react-router-dom";
import 'antd/dist/antd.css';

import { getJwt } from './utils';

interface PrivateRouteProps {
  path: string;
  children: React.ReactNode;
}

export default function PrivateRoute(props: PrivateRouteProps): React.ReactElement {
  return (
    <Route
      path={props.path}
      render={() => {
        if (getJwt()) {
          return props.children;
        }
        return <Redirect to="/login" />
      }}
    />
  );
}