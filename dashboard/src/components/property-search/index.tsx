import React from 'react';

import RemoteBoundary from '../remote-boundary';

// @ts-expect-error property_search/Search is loaded remotely
const Search = React.lazy(() => import('property_search/Search'));

export default function PropertySearch(): React.ReactElement {
  return (
    <RemoteBoundary name="Property Search">
      <Search />
    </RemoteBoundary>
  );
}
