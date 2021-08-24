import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';

import CustomerSearch, { Customer } from '../components/customer-search';

export default function HomePage(): React.ReactElement {
  const history = useHistory();

  const selectCustomer = (cust: Customer) => history.push(`/customer/${cust._id}`);

  return (
    <Card>
      <CustomerSearch onSelect={selectCustomer} />
    </Card>
  );
}