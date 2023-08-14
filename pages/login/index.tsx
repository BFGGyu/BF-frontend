import Header from '@common/Header';
import FONT from '@constants/fonts';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const LoginPage = () => {
  const handleClickLogin = () => {};
  return (
    <LoginWrapper>
      <Header page='review' />
      <TextWrapper>
        <LoginText style={FONT.HEADLINE1}>로그인</LoginText>
        <SubText style={FONT.HEADLINE2}>소셜로그인으로 가입할 수 있습니다.</SubText>
        <LoginButton onClick={handleClickLogin}>
          <Image src='/images/kakaoLogin.png' alt='' width={300} height={50} />
        </LoginButton>
      </TextWrapper>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: inherit;
  height: inherit;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
  gap: 20px;
`;

const LoginText = styled.div``;

const SubText = styled.div``;

const LoginButton = styled.div`
  cursor: pointer;
`;

export default LoginPage;
