import Image from 'next/image';
import { styled } from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { nicknameState } from '@states/user';

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
      {type === 'blue' && <Image src='/images/blueHeader.svg' alt='' width={80} height={30} />}
      {type === 'white' && <Image src='/images/whiteHeader.svg' alt='' width={80} height={30} />}
      <UserIconButton>
        {nickname ? (
          <AiOutlineUser onClick={() => router.push('/mypage')} size={30} />
        ) : (
          <LoginText onClick={() => router.push('/login')}>로그인</LoginText>
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
  padding: 20px 10px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
`;

const UserIconButton = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LoginText = styled.div``;

export default Header;
