import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Splash from './Splash';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/main').then(() => router.push('/main'));
  }, [router]);

  return <Splash />;
};

export default Index;
