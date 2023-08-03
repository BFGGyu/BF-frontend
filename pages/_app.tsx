import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import GlobalStyle from '../src/styles/globalStyle';
import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';

const Reactproject: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>BFGGyu</title>
      </Head>
      <RecoilRoot>
        <GlobalStyle />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </RecoilRoot>
    </>
  );
};

const MainLayout = styled.div`
  width: 390px;
  height: 844px;
  margin: 0 auto;
`;

export default Reactproject;
