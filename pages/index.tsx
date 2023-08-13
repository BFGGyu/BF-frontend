import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import Splash from './Splash';
import Router, { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/main');
    }, 1500);
  }, []);

  return <Splash />;
};

export default Index;
