import React from 'react';

import { Customer } from '../customer-search';
import RemoteBoundary from '../remote-boundary';

// @ts-expect-error vehicle_search/Search is loaded remotely
const Search = React.lazy(() => import('vehicle_search/Search'));

interface VehicleSearchProps {
  customer?: Customer;
}

export default function VehicleSearch(props: VehicleSearchProps): React.ReactElement {
  const { customer } = props;

  if (!customer) {
    return <></>;
  }

  return (
    <RemoteBoundary name={`Vehicle Search for ${customer.first_name} ${customer.last_name}`}>
      <h3>Vehicle Search for {customer.first_name} {customer.last_name}</h3>
      <Search />
    </RemoteBoundary>
  );
}
