import React from 'react';

import RemoteBoundary from '../remote-boundary';
import { getJwt } from '../../utils';

// @ts-expect-error customer_search/Details is loaded remotely
const Details = React.lazy(() => import('customer_search/Details'));

interface DetailsProps {
  customer_id: number;
}

export default function CustomerDetails(props: DetailsProps): React.ReactElement {
  const { customer_id } = props;

  return (
    <RemoteBoundary name="Customer Details">
      <Details jwt={getJwt()} _id={customer_id} />
    </RemoteBoundary>
  );
}
