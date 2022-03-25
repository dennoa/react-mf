import React, { useState } from 'react';
import { Alert, Card, Descriptions, Spin, Table, Row, Col } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import { CheckCircleFilled } from '@ant-design/icons';
import useSWR from 'swr';
import styled from 'styled-components';

import { getRequestInit } from '../../utils';

const WithSelectableRows = styled.div`
  tr:hover {
    cursor: pointer;
    color: #000000;
  }
`;

const svxUrl = 'https://svx-pre.dataeng.internal:3001';
const customerUrl = `${svxUrl}/customers`;

interface Address {
  _id: string;
  full_address: string;
}

interface Structure {
  is_primary: boolean;
  construction_year: number;
  bedroom_count: number;
  bathroom_count: number;
}

interface Property {
  property_id: string;
  centroid: {
    coordinates: [number, number];
  };
  slope: string;
  structures: Structure[];
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
  customer_id: number;
  componentNamespace?: string;
}

async function fetchProperty(addr: Address, jwt: string): Promise<Property> {
  const url = `${svxUrl}/properties?address=${encodeURIComponent(addr.full_address)}`;
  const res = await fetch(url, getRequestInit(jwt));
  if (res.status === 200) {
    const { properties } = await res.json();
    return (properties || []).length > 0 ? properties[0] : undefined;
  }
  throw new Error(res.statusText);
}

export default function Details(props: DetailsProps): React.ReactElement {
  const { jwt, customer_id } = props;
  const swr = useSWR([`${customerUrl}/${customer_id}/addresses`, jwt], fetcher);
  const [selectedIdx, selectIdx] = useState<number>(-1);
  const [properties, setProperties] = useState<Property[]>([]);

  const addresses = swr.data;

  if (!addresses) {
    return <></>;
  }

  const renderPreferred = (preferred: boolean) =>
    (preferred && <CheckCircleFilled style={{ color: '#52c41a' }} />);

  const columns: ColumnsType<Address> = [
    {
      title: 'Property',
      dataIndex: 'full_address',
    },
    {
      title: 'Preferred',
      dataIndex: 'preferred',
      align: 'center',
      render: renderPreferred,
    },
  ];

  const onRow = (addr: Address) => ({
    onClick: () => {
      const idx = addresses.findIndex((a: Address) => a._id === addr._id);
      selectIdx(idx);
      if (!properties[idx]) {
        fetchProperty(addr, jwt).then(property => {
          const newProperties = [...properties];
          newProperties[idx] = property;
          setProperties(newProperties);
        });
      }
    },
  });

  return (
    <Card>
      {swr.error && (
        <Alert message={swr.error.message} type="error" showIcon />
      )}
      <Row gutter={16}>
        <Col sm={12}>
          <WithSelectableRows>
            <Table
              rowKey="_id"
              columns={columns}
              dataSource={addresses}
              loading={swr.isValidating}
              onRow={onRow}
            />
          </WithSelectableRows>
        </Col>
        <Col sm={12}>
          {selectedIdx >= 0 && (
            <>
              {properties[selectedIdx] ? (
                <Card title={addresses[selectedIdx].full_address}>
                  <Descriptions column={1}>
                    <Descriptions.Item label="GNAF">
                      {properties[selectedIdx].property_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Coordinates">
                      {properties[selectedIdx].centroid.coordinates.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Slope">
                      {properties[selectedIdx].slope}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              ) : (
                <Spin size="large" />
              )}
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
}