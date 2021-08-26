import React from 'react';
import { Alert, Card, Descriptions } from 'antd';
import 'antd/dist/antd.css';
import useSWR from 'swr'; 

import { getRequestInit } from '../../utils';

const baseUrl = 'https://svx-pre.dataeng.internal:3001/customers';

interface Customer {
  _id: number;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  current_policy_count: number;
}

async function fetcher(url: string, jwt: string): Promise<Customer> {
  const res = await fetch(url, getRequestInit(jwt));
  if (res.status === 200) {
    const { customer } = await res.json();
    return customer;
  }
  throw new Error(res.statusText);
}

interface DetailsProps {
  jwt: string;
  _id: number;
}

export default function Details(props: DetailsProps): React.ReactElement {
  const { jwt, _id } = props;
  const swr = useSWR([`${baseUrl}/${_id}`, jwt], fetcher);

  const customer = swr.data;

  if (!customer) {
    return <></>;
  }

  return (
    <Card>
      {swr.error && (
        <Alert message={swr.error.message} type="error" showIcon />
      )}
      <Descriptions>
        <Descriptions.Item label="Name">
          {customer.title} {customer.first_name} {customer.middle_name} {customer.last_name}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {(customer.date_of_birth || '').substring(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {customer.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Current Policies">{customer.current_policy_count}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}