import React from 'react';

import HomePage from './pages/home-page/lazy';

export default function App(): React.ReactElement {
  return (
    <>
      <h1>Customer search</h1>
      <HomePage />
    </>
  );
}