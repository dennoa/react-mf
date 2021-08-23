import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';


interface RemoteBoundaryProps {
  name: string;
  children: React.ReactNode;
}

export default function RemoteBoundary(props: RemoteBoundaryProps): React.ReactElement {

  function LoadingFallback(): React.ReactElement {
    return (
      <div>Loading {props.name}...</div>
    );
  }

  function ErrorFallback(): React.ReactElement {
    return (
      <div role="alert">Unable to load {props.name}</div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <React.Suspense fallback={<LoadingFallback />}>
        {props.children}
      </React.Suspense>
    </ErrorBoundary>
  );
}
