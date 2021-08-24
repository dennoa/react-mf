import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tabs } from 'antd';

import CustomerDetails from '../components/customer-details';
import PropertyDetails from '../components/property-details';
import VehicleSearch from '../components/vehicle-search';

interface CustomerPageParams {
  _id: string;
}

export default function CustomerPage(): React.ReactElement {
  const { _id } = useParams<CustomerPageParams>();

  return (
    <Card>
      <Tabs defaultActiveKey="customer">
        <Tabs.TabPane key="customer" tab="Customer Details">
          <CustomerDetails customer_id={+_id} />
        </Tabs.TabPane>
        <Tabs.TabPane key="property" tab="Property Details">
          <PropertyDetails customer_id={+_id} />
        </Tabs.TabPane>
        <Tabs.TabPane key="vehicle" tab="Vehicle Details">
          <VehicleSearch customer_id={+_id} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}