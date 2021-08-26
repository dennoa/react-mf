import React from 'react';

import Search from '../../containers/search';

export default function HomePage(): React.ReactElement {
  return (
    <>
      <h1>Property search</h1>
      <Search />
    </>
  );
}