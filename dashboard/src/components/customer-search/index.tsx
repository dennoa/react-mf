import React from 'react';

import RemoteBoundary from '../remote-boundary';

// @ts-expect-error customer_search/Search is loaded remotely
const Search = React.lazy(() => import('customer_search/Search'));

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
}

interface SearchProps {
  onSelect?: (cust: Customer) => void;
}

export default function CustomerSearch(props: SearchProps): React.ReactElement {
  return (
    <RemoteBoundary name="Customer Search">
      <h3>Customer Search</h3>
      <Search onSelect={props.onSelect} />
    </RemoteBoundary>
  );
}
