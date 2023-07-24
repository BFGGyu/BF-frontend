import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import GlobalStyle from '../src/styles/globalStyle';
import React from 'react';

const Reactproject: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>create next app</title>
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
};

export default Reactproject;
