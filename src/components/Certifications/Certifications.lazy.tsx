import React, { lazy, Suspense } from 'react';

const LazyCertifications = lazy(() => import('./Certifications'));

const Certifications = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCertifications {...props} />
  </Suspense>
);

export default Certifications;
