import React, { lazy, Suspense } from 'react';

const LazyHero = lazy(() => import('./Hero'));

const Hero = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHero {...props} />
  </Suspense>
);

export default Hero;
