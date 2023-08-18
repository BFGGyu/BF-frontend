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
  type: string;
}

const Header = ({ bgColor, color, type }: IHeaderProps) => {
  const router = useRouter();
  const nickname = useRecoilValue(nicknameState);

  return (
    <HeaderWrapper $bgColor={bgColor} $color={color}>
      <LogoWrapper onClick={() => router.push('/main')}>
        {type === 'blue' && <Image src='/images/blueHeader.svg' alt='' width={80} height={30} />}
        {type === 'white' && <Image src='/images/whiteHeader.svg' alt='' width={80} height={30} />}
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
  height: 5vh;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`;
const UserIconButton = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LoginText = styled.div``;

export default Header;
