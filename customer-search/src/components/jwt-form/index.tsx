import React from 'react';
import { Card, Form, Input, Button } from 'antd';

export interface JwtFormData {
  jwt: string;
}

interface JwtFormProps {
  className?: string;
  onFinish: (params: JwtFormData) => void;
  initialValues?: JwtFormData;
}

export default function JwtForm(props: JwtFormProps): React.ReactElement {
  return (
    <Card>
      <Form
        name="jwt-form"
        layout="inline"
        onFinish={props.onFinish}
        className={props.className}
        initialValues={props.initialValues}
      >
        <Form.Item
          label="JWT"
          name="jwt"
          rules={[{ required: true, message: 'Please enter a Json Web Token for the SVx API' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ok
        </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
