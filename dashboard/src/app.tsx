import React, { useState } from 'react';

import CustomerSearch from './components/customer-search';
import PropertySearch from './components/property-search';
import VehicleSearch from './components/vehicle-search';

export default function App(): React.ReactElement {
  const [customer, selectCustomer] = useState();

  return (
    <>
      <h1>Dashboard</h1>
      <CustomerSearch onSelect={selectCustomer} />
      <PropertySearch customer={customer} />
      <VehicleSearch customer={customer} />
    </>
  );
}