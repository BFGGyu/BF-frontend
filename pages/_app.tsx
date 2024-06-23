import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';

import GlobalStyle from '../src/styles/globalStyle';

import SCREEN_SIZE from '@constants/sizes';
import MSWProvider from 'src/mocks/MSWProvider';

const queryClient = new QueryClient();

const NextApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>WheelPass</title>
      </Head>
      <MSWProvider>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </QueryClientProvider>
        </RecoilRoot>
      </MSWProvider>
    </>
  );
};

const MainLayout = styled.div`
  width: ${SCREEN_SIZE.WIDTH};
  height: 100vh;
  margin: 0 auto;
`;

export default NextApp;
