import React from 'react';

export const getRequestInit = (jwt: string): RequestInit => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  },
});

/**
 * Lazy loader
 * e.g. lazyLoad(() => import('./index'));
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function lazyLoad(importFunc: () => Promise<{ default: React.ComponentType<any>; }>): (props: unknown) => JSX.Element {
  const LazyComponent = React.lazy(importFunc);
  return function load(props: unknown): JSX.Element {
    return (
      <React.Suspense fallback={null}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  }
}
