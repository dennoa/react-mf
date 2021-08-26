import React from 'react';
import { useHistory } from "react-router-dom";

import Login from '../../containers/login';

import { clearJwt, setJwt } from '../../utils';

export default function LoginPage(): React.ReactElement {
  const history = useHistory();

  const onLogin = (jwt: string) => {
    setJwt(jwt);
    history.push('/');
  };

  return (
    <Login
      onLogin={onLogin}
      onLoginFailed={clearJwt}
    />
  );
}
