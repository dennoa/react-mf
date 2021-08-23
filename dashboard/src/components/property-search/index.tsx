import React from 'react';

import { Customer } from '../customer-search';
import RemoteBoundary from '../remote-boundary';

// @ts-expect-error property_search/Search is loaded remotely
const Search = React.lazy(() => import('property_search/Search'));

interface PropertySearchProps {
  customer?: Customer;
}

export default function PropertySearch(props: PropertySearchProps): React.ReactElement {
  const { customer } = props;

  if (!customer) {
    return <></>;
  }

  return (
    <RemoteBoundary name={`Property Search for ${customer.first_name} ${customer.last_name}`}>
      <h3>Property Search for {customer.first_name} {customer.last_name}</h3>
      <Search />
    </RemoteBoundary>
  );
}
