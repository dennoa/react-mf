import React from 'react';

import RemoteBoundary from '../remote-boundary';

// @ts-expect-error vehicle_search/Search is loaded remotely
const Search = React.lazy(() => import('vehicle_search/Search'));

interface VehicleSearchProps {
  customer_id: number;
}

export default function VehicleSearch(props: VehicleSearchProps): React.ReactElement {
  const { customer_id } = props;

  return (
    <RemoteBoundary name={`Vehicle Search for ${customer_id}`}>
      <Search customer_id={customer_id} />
    </RemoteBoundary>
  );
}
