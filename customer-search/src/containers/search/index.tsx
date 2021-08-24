import React, { useState } from 'react';
import { Alert, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import useSWR from 'swr'; 
import styled from 'styled-components';

import { getRequestInit } from '../../utils';
import SearchForm, { SearchParams } from './search-form';
import './search.css';

const StyledSearchForm = styled(SearchForm)`
  margin: 12px;
`;

const baseUrl = 'https://svx-pre.dataeng.internal:3001/customers?skip=0&limit=100';

interface Customer {
  _id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  current_policy_count: number;
}

async function fetcher(url: string, jwt: string, searchParams: SearchParams): Promise<Customer[]|null> {
  if (!searchParams || !searchParams.name) {
    return null;
  }
  const res = await fetch(`${url}&name=${encodeURIComponent(searchParams.name)}`, getRequestInit(jwt));
  if (res.status === 200) {
    const { customers } = await res.json();
    return customers;
  }
  throw new Error(res.statusText);
}

interface SearchProps {
  jwt?: string;
  onSelect?: (cust: Customer) => void;
}

export default function Search(props: SearchProps): React.ReactElement {
  const { jwt, onSelect } = props;
  const [searchParams, setSearchParams] = useState<SearchParams>();
  const swr = useSWR([baseUrl, jwt, searchParams], fetcher);

  const toSortName = (cust: Customer) =>
    `${cust.first_name || ''} ${cust.middle_name || ''} ${cust.last_name || ''}`;

  const renderName = (cust: Customer) => (
    <span>{cust.first_name} {cust.middle_name} {cust.last_name}</span>
  );

  const columns: ColumnsType<Customer> = [
    {
      title: 'Name',
      sorter: (a: Customer, b: Customer) => {
        const nameA = toSortName(a);
        const nameB = toSortName(b);
        if (nameA === nameB) {
          return 0;
        }
        return (nameA < nameB) ? -1 : 1;
      },
      render: renderName,
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      render: (dob: string) => (dob || '').substring(0, 10),
    },
    {
      title: 'Current Policies',
      dataIndex: 'current_policy_count',
      align: 'right',
      sorter: (a: Customer, b: Customer) => a.current_policy_count - b.current_policy_count,
    },
  ];

  const dataSource: Customer[] = swr.data || [];

  const onRow = !onSelect ? undefined : (cust: Customer) => ({
    onClick: () => onSelect(cust),
  });

  return (
    <Card>
      {swr.error && (
        <Alert message={swr.error.message} type="error" showIcon />
      )}
      <StyledSearchForm onSubmit={setSearchParams} />
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={dataSource}
        onRow={onRow}
        loading={swr.isValidating}
        rowClassName="selectable_row"
      />
    </Card>
  );
}