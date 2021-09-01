import React, { useState } from 'react';
import { Alert, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import useSWR from 'swr';

import { getRequestInit } from '../../utils';
import SearchForm, { SearchParams } from './search-form';

const StyledSearchForm = styled(SearchForm)`
  margin: 12px;
`;

const WithSelectableRow = styled.div`
  tr:hover {
    cursor: pointer;
    color: #000000;
  }
`;

const baseUrl = 'https://svx-pre.dataeng.internal:3001/customers?skip=0&limit=100&include_addresses=true';

interface Address {
  full_address: string;
  preferred: boolean;
}

export interface Customer {
  _id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  current_policy_count: number;
  addresses: Address[];
}

interface SearchData {
  params?: SearchParams;
  customers?: Customer[];
}

async function fetcher(url: string, jwt: string, params: SearchParams): Promise<SearchData | undefined> {
  if (!params || !params.name) {
    return undefined;
  }
  const query = `name=${encodeURIComponent(params.name)}`;
  const res = await fetch(`${url}&${query}`, getRequestInit(jwt));
  if (res.status === 200) {
    const { customers } = await res.json();
    return { params, customers };
  }
  throw new Error(res.statusText);
}

interface SearchProps {
  jwt: string;
  componentNamespace?: string;
  initialData?: SearchData;
  onDataChange?: (data?: SearchData) => void;
  onSelect?: (cust: Customer) => void;
}

export default function Search(props: SearchProps): React.ReactElement {
  const { jwt, initialData, onDataChange, onSelect } = props;
  const componentNamespace = props.componentNamespace || 'customer_search';
  const initialParams = (initialData || { params: undefined }).params as SearchParams;
  const [params, setParams] = useState<SearchParams>(initialParams);
  const swrOptions = {
    initialData,
    onSuccess: (data?: SearchData) => {
      if (onDataChange) {
        onDataChange(data);
      }
    },
  };
  const swr = useSWR([baseUrl, jwt, params], fetcher, swrOptions);

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
      title: 'Address',
      dataIndex: 'addresses',
      render: (addresses: Address[]) => {
        if ((addresses || []).length === 0) {
          return null;
        }
        const addr = addresses.find(addr => addr.preferred) || addresses[0];
        return addr.full_address;
      },
    },
    {
      title: 'Current Policies',
      dataIndex: 'current_policy_count',
      align: 'right',
      sorter: (a: Customer, b: Customer) => a.current_policy_count - b.current_policy_count,
    },
  ];

  const onRow = !onSelect ? undefined : (cust: Customer) => ({
    onClick: () => onSelect(cust),
  });

  const { customers } = swr.data || { customers: [] };

  return (
    <Card>
      {swr.error && (
        <Alert message={swr.error.message} type="error" showIcon />
      )}
      <StyledSearchForm
        componentNamespace={componentNamespace}
        onSubmit={setParams}
        initialValues={params}
      />
      <WithSelectableRow>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={customers}
          onRow={onRow}
          loading={swr.isValidating}
        />
      </WithSelectableRow>
    </Card>
  );
}