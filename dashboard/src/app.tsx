import React from 'react';

import CustomerSearch from './components/customer-search';
import PropertySearch from './components/property-search';
import VehicleSearch from './components/vehicle-search';

export default function App(): React.ReactElement {
  return (
    <>
      <h1>Dashboard</h1>
      <CustomerSearch />
      <PropertySearch />
      <VehicleSearch />
    </>
  );
}