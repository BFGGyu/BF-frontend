import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Splash from './Splash';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/main').then(() => router.push('/main'));
  }, [router]);

  return <Splash />;
};

export default Index;
