import React from 'react';

interface SearchProps {
  componentNamespace?: string;
  customer_id?: number;
}

export default function Search(props: SearchProps): React.ReactElement {
  if (!props.customer_id) {
    return <></>;
  }
  
  return (
    <div>TODO: Find vehicles for customer id {props.customer_id}</div>
  );
}