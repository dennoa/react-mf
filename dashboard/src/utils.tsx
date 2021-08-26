import React from 'react';

/**
 * The JWT is persisted in localStorage so we can refresh the page wthout needing to re-authenticate
 */
export const clearJwt = (): void => localStorage.removeItem('jwt');
export const setJwt = (jwt: string): void => localStorage.setItem('jwt', jwt);
export const getJwt = (): string|null => localStorage.getItem('jwt');

/**
 * Lazy loader
 * e.g. lazyLoad(() => import('./index'));
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type ImportFuncType = () => Promise<{ default: React.ComponentType<any>; }>;

export function lazyLoad(importFunc: ImportFuncType): (props: unknown) => React.ReactElement {
    const LazyComponent = React.lazy(importFunc);
    return function load(props: unknown): React.ReactElement {
      return (
        <React.Suspense fallback={null}>
          <LazyComponent {...props} />
        </React.Suspense>
      );
    }
  }
