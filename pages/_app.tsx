import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import GlobalStyle from '../src/styles/globalStyle';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import SCREEN_SIZE from '@constants/sizes';

if (process.env.NODE_ENV === 'development') {
  (async () => {
    const { worker } = await import('../src/mocks/browser');
    worker.start();
  })();
}

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
  width: ${SCREEN_SIZE.WIDTH};
  height: ${SCREEN_SIZE.HEIGHT};
  margin: 0 auto;
`;

export default Reactproject;
