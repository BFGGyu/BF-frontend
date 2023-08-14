import { login } from '@apis/user';
import Header from '@common/Header';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, nicknameState } from '@states/user';
import styled from 'styled-components';

const LoginPage = () => {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setNickname = useSetRecoilState(nicknameState);

  const handleClickLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    router.push(KAKAO_AUTH_URL);
  };

  useEffect(() => {
    if (router.query.code && typeof router.query.code == 'string') {
      login(router.query.code).then((data) => {
        if (typeof data !== 'undefined') {
          setNickname(`${data.nickname} 님`);
          setIsLoggedIn(true);
          router.push('/');
        }
      });
    }
  });

  return (
    <LoginWrapper>
      <Header type='blue' />
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
