import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';


interface Customer {
  id: number;
  first_name: string;
  last_name: string;
}

interface SearchProps {
  onSelect?: (cust: Customer) => void;
}

export default function Search(props: SearchProps): React.ReactElement {
  const { onSelect } = props;

  const columns = [
    { title: 'First Name', dataIndex: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name' },
  ];

  const dataSource = [
    { id: 1, first_name: 'Bob', last_name: 'Smith' },
    { id: 2, first_name: 'Cindy', last_name: 'Jacobs' },
    { id: 3, first_name: 'Alex', last_name: 'Larinder' },
  ];

  const onRow = !onSelect ? null : (cust: Customer) => ({
    onClick: () => onSelect(cust),
  });

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      onRow={onRow}
    />
  );
}