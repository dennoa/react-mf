import React from 'react';
import { Alert, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import useSWR from 'swr';

import { getRequestInit } from '../../utils';

const baseUrl = 'https://svx-pre.dataeng.internal:3001/customers';

interface Address {
  _id: string;
  full_address: string;
}

async function fetcher(url: string, jwt: string): Promise<Address[]> {
  const res = await fetch(url, getRequestInit(jwt));
  if (res.status === 200) {
    const { addresses } = await res.json();
    return addresses;
  }
  throw new Error(res.statusText);
}

interface DetailsProps {
  jwt: string;
  _id: number;
}

export default function Details(props: DetailsProps): React.ReactElement {
  const { jwt, _id } = props;
  const swr = useSWR([`${baseUrl}/${_id}/addresses`, jwt], fetcher);

  const addresses = swr.data;

  if (!addresses) {
    return <></>;
  }

  const columns: ColumnsType<Address> = [
    {
      title: 'Full Address',
      dataIndex: 'full_address',
    },
  ];

  const dataSource: Address[] = swr.data || [];

  return (
    <Card>
      {swr.error && (
        <Alert message={swr.error.message} type="error" showIcon />
      )}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={dataSource}
        loading={swr.isValidating}
      />
    </Card>
  );
}