import React from 'react';

import RemoteBoundary from '../remote-boundary';

// @ts-expect-error vehicle_search/Search is loaded remotely
const Search = React.lazy(() => import('vehicle_search/Search'));

export default function VehicleSearch(): React.ReactElement {
  return (
    <RemoteBoundary name="Vehicle Search">
      <Search />
    </RemoteBoundary>
  );
}
