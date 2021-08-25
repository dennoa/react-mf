import React from 'react';
import { Alert, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import { CheckCircleFilled } from '@ant-design/icons';
import useSWR from 'swr';

import { getRequestInit } from '../../utils';

const baseUrl = 'https://svx-pre.dataeng.internal:3001/customers';

interface Plate {
  plate: string;
  state: string;
  dateSeen: string;
}

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  plates: Plate[];
  policyActive: boolean;
}

async function fetcher(url: string, jwt: string): Promise<Vehicle[]> {
  const res = await fetch(url, getRequestInit(jwt));
  if (res.status === 200) {
    const { vehicles } = await res.json();
    return vehicles;
  }
  throw new Error(res.statusText);
}

interface DetailsProps {
  jwt: string;
  customer_id: number;
}

export default function Details(props: DetailsProps): React.ReactElement {
  const { jwt, customer_id } = props;
  const swr = useSWR([`${baseUrl}/${customer_id}/vehicles`, jwt], fetcher);

  const vehicles = swr.data;

  if (!vehicles) {
    return <></>;
  }

  const renderVehicle = (v: Vehicle) => (<span>{v.year} {v.make} {v.model}</span>);

  const renderRego = (plates: Plate[]) => {
    if ((plates || []).length === 0) {
      return null;
    }
    plates.sort((a, b) => a.dateSeen < b.dateSeen ? -1 : 1);
    return plates[0].plate;
  };

  const renderPolicyActive = (preferred: boolean) =>
    (preferred && <CheckCircleFilled style={{ color: '#52c41a' }} />);

  const renderDateSeen = (dateSeen: string) => (dateSeen || '').substr(0, 10);

  const columns: ColumnsType<Vehicle> = [
    { title: 'Vehicle', render: renderVehicle },
    { title: 'Rego', dataIndex: 'plates', render: renderRego },
    { title: 'Vin', dataIndex: 'vin' },
    {
      title: 'Current Policy',
      dataIndex: 'policyActive',
      align: 'center',
      render: renderPolicyActive,
    },
  ];

  const plateColumns: ColumnsType<Plate> = [
    { title: 'Rego', dataIndex: 'plate' },
    { title: 'State', dataIndex: 'state' },
    { title: 'Date Seen', dataIndex: 'dateSeen', render: renderDateSeen },
  ];

  const rowExpandable = (v: Vehicle) => (v.plates || []).length > 0;

  const expandedRowRender = (v: Vehicle) => (
    <Card title="Registration Details" size="small">
      <Table
        rowKey="plate"
        columns={plateColumns}
        dataSource={v.plates || []}
        pagination={false}
      />
    </Card>
  );

  return (
    <Card>
      {swr.error && (
        <Alert message={swr.error.message} type="error" showIcon />
      )}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={vehicles}
        loading={swr.isValidating}
        expandable={{ expandedRowRender, rowExpandable }}
      />
    </Card>
  );
}