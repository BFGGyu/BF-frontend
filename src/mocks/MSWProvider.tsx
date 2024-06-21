'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

const isDevelopment = process.env.NODE_ENV === 'development';

const MSWProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (isDevelopment) {
        const res = await import('./index');
        await res.initMSW();
        setIsReady(true);
      }
    };

    if (!isReady) init();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};

export default MSWProvider;
