import React, { useState } from 'react';
import { Alert, Card, Form, Input, Button, Row, Col } from 'antd';
import styled from 'styled-components';

const AuthAlert = styled(Alert)`
  margin-bottom: 16px;
`;

interface Credentials {
  username: string;
  password: string;
}

interface LoginProps {
  onLogin: (jwt: string) => void;
  onLoginFailed: () => void;
}

export default function Login(props: LoginProps): React.ReactElement {
  const [authErr, setAuthErr] = useState<string>();

  const onFinish = async (creds: Credentials) => {
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
        return props.onLogin(json.jwt);
      }
      setAuthErr(res.statusText);
    } catch (err) {
      setAuthErr(err.message);
    }
    return props.onLoginFailed();
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
