import React from 'react';
import { Form, Input, Button } from 'antd';

export interface SearchParams {
  name: string;
}

interface SearchFormProps {
  className?: string;
  onSubmit: (params: SearchParams) => void;
}

export default function SearchForm(props: SearchFormProps): React.ReactElement {
  return (
    <Form
      name="search"
      layout="inline"
      onFinish={props.onSubmit}
      className={props.className}
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
