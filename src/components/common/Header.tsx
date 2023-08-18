import Image from 'next/image';
import { styled } from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { nicknameState } from '@states/user';
import FONT from '@constants/fonts';

interface IHeaderProps {
  bgColor?: string;
  color?: string;
  type?: string;
}

const Header = ({ bgColor, color, type }: IHeaderProps) => {
  const router = useRouter();
  const nickname = useRecoilValue(nicknameState);

  return (
    <HeaderWrapper $bgColor={bgColor} $color={color}>
      <LogoWrapper>
        <Image
          src='/images/whiteHeader.svg'
          alt=''
          width={100}
          height={40}
          onClick={() => router.push('/main')}
        />
        <SubText style={FONT.BODY1}>휠체어 이용자를 위한 안전한 경로 안내</SubText>
      </LogoWrapper>
      <UserIconButton>
        {nickname ? (
          <AiOutlineUser onClick={() => router.push('/mypage')} size={30} />
        ) : (
          <LoginText style={FONT.HEADLINE2} onClick={() => router.push('/login')}>
            Login
          </LoginText>
        )}
      </UserIconButton>
    </HeaderWrapper>
  );
};

interface HeaderType {
  $bgColor?: string;
  $color?: string;
}

const HeaderWrapper = styled.div<HeaderType>`
  display: flex;
  height: 6vh;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
`;

const LogoWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 20px;
`;

const SubText = styled.div``;

const UserIconButton = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LoginText = styled.div``;

export default Header;
