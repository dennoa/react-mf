import React from 'react';

import RemoteBoundary from '../remote-boundary';

// @ts-expect-error vehicle_search/Search is loaded remotely
const Details = React.lazy(() => import('vehicle_search/Details'));
import { getJwt } from '../../utils';

interface VehicleDetailsProps {
  customer_id: number;
}

export default function VehicleDetails(props: VehicleDetailsProps): React.ReactElement {
  const { customer_id } = props;

  return (
    <RemoteBoundary name={`Vehicle Details for ${customer_id}`}>
      <Details jwt={getJwt()} customer_id={customer_id} />
    </RemoteBoundary>
  );
}
