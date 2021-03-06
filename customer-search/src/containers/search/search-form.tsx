import React from 'react';
import { Form, Input, Button } from 'antd';

export interface SearchParams {
  name: string;
}

interface SearchFormProps {
  componentNamespace: string;
  className?: string;
  onSubmit: (params: SearchParams) => void;
  initialValues?: SearchParams;
}

export default function SearchForm(props: SearchFormProps): React.ReactElement {
  return (
    <Form
      name={`${props.componentNamespace}_form`}
      layout="inline"
      onFinish={props.onSubmit}
      className={props.className}
      initialValues={props.initialValues}
    >
      <Form.Item
        label="Customer Name"
        name="name"
        rules={[{ required: true, message: 'Please enter a customer name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}
