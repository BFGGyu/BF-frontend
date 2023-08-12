import FONT from '@constants/fonts';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Splash = () => {
  return (
    <SplashWrapper>
      <BodyWrapper>
        <Image src='/images/splash.svg' alt='title' width={200} height={100} />
        <MainText style={FONT.HEADLINE2}>모두에게 편안한 문화생활의 길</MainText>
      </BodyWrapper>
    </SplashWrapper>
  );
};

const SplashWrapper = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
`;

const MainText = styled.div``;

export default Splash;
