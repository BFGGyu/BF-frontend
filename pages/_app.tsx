import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import GlobalStyle from '../src/styles/globalStyle';
import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const Reactproject: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>BFGGyu</title>
      </Head>
      <GlobalStyle />
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
};

export default Reactproject;
