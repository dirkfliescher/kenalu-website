// Mock für next/dynamic in Storybook
// Verwendet React.lazy statt Next.js dynamic imports
import React from 'react';

const dynamic = (importFn, options = {}) => {
  // In Storybook: React.lazy mit Suspense-Fallback
  const LazyComponent = React.lazy(importFn);

  const DynamicWrapper = (props) => (
    <React.Suspense fallback={options.loading ? React.createElement(options.loading) : null}>
      <LazyComponent {...props} />
    </React.Suspense>
  );

  DynamicWrapper.displayName = 'NextDynamic';
  return DynamicWrapper;
};

export default dynamic;
