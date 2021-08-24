import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu } from 'antd';

export default function NavMenu(): React.ReactElement {
  const { pathname } = useLocation();

  if (pathname === '/login') {
    return <></>;
  }

  return (
    <Menu mode="horizontal" defaultActiveFirst={true}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );
}