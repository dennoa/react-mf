import React from 'react';

import RemoteBoundary from '../remote-boundary';

// @ts-expect-error customer_search/Search is loaded remotely
const Search = React.lazy(() => import('customer_search/Search'));

export default function CustomerSearch(): React.ReactElement {
  return (
    <RemoteBoundary name="Customer Search">
      <Search />
    </RemoteBoundary>
  );
}
