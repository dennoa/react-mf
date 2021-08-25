import React from 'react';

import RemoteBoundary from '../remote-boundary';

// @ts-expect-error property_search/Search is loaded remotely
const Details = React.lazy(() => import('property_search/Details'));
import { getJwt } from '../../utils';

interface PropertyDetailsProps {
  customer_id: number;
}

export default function PropertyDetails(props: PropertyDetailsProps): React.ReactElement {
  const { customer_id } = props;

  return (
    <RemoteBoundary name={`Property Details for ${customer_id}`}>
      <Details jwt={getJwt()} customer_id={customer_id} />
    </RemoteBoundary>
  );
}
