import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Alert, Card, Form, Input, Button, Row, Col } from 'antd';
import styled from 'styled-components';

import { clearJwt, setJwt } from '../utils';

const AuthAlert = styled(Alert)`
  margin-bottom: 16px;
`;

interface Credentials {
  username: string;
  password: string;
}

export default function LoginPage(): React.ReactElement {
  const history = useHistory();
  const [authErr, setAuthErr] = useState<string>();

  const onFinish = async (creds: Credentials) => {
    clearJwt();
    try {
      const res = await fetch('https://svx-pre.dataeng.internal:3001/users-auth', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
      });
      if (res.status === 200) {
        const json = await res.json();
        setJwt(json.jwt);
        return history.push('/');
      }
      setAuthErr(res.statusText);
    } catch (err) {
      setAuthErr(err.message);
    }
  };

  return (
    <Card title="Login">

      {authErr && (
        <Row>
          <Col span={8}>
            <AuthAlert message={authErr} type="error" showIcon />
          </Col>
        </Row>
      )}

      <Form
        name="login"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
     >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
