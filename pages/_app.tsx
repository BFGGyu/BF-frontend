import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import GlobalStyle from '../src/styles/globalStyle';
import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import styled from 'styled-components';

const Reactproject: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>BFGGyu</title>
      </Head>
      <GlobalStyle />
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Wrapper>
    </>
  );
};

const MainLayout = styled.div`
  width: 390px;
  height: 844px;
  border: 2px solid black;
  margin: 0 auto;
`;

export default Reactproject;
