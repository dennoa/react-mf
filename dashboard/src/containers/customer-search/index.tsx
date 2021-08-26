import React from 'react';

import RemoteBoundary from '../../components/remote-boundary';
import { getJwt } from '../../utils';
import { customerSearch } from '../../store';

// @ts-expect-error customer_search/Search is loaded remotely
const Search = React.lazy(() => import('customer_search/Search'));

export interface Customer {
  _id: number;
  first_name: string;
  last_name: string;
}

export interface CustomerSearchState {
  params?: {
    name: string;
  };
  results?: Customer[];
}

interface SearchProps {
  onSelect?: (cust: Customer) => void;
}

export default function CustomerSearch(props: SearchProps): React.ReactElement {
  const initialData = customerSearch.get();
  const onDataChange = customerSearch.set;

  return (
    <RemoteBoundary name="Customer Search">
      <Search
        jwt={getJwt()}
        initialData={initialData}
        onDataChange={onDataChange}
        onSelect={props.onSelect}
      />
    </RemoteBoundary>
  );
}
