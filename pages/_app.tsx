import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import GlobalStyle from '../src/styles/globalStyle';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import SCREEN_SIZE from '@constants/sizes';
import { QueryClient, QueryClientProvider } from 'react-query';

// if (process.env.NODE_ENV === 'development') {
//   (async () => {
//     const { worker } = await import('../src/mocks/browser');
//     worker.start();
//   })();
// }

const queryClient = new QueryClient();

const Reactproject: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>WheelPass</title>
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </QueryClientProvider>
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
