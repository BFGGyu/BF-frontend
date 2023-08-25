import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Splash from './Splash';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/main');
    }, 1500);
  }, [router]);

  return <Splash />;
};

export default Index;
