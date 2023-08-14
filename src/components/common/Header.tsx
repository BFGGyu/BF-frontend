import Image from 'next/image';
import { styled } from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';

interface IHeaderProps {
  bgColor?: string;
  color?: string;
  page: string;
}

const Header = ({ bgColor, color, page }: IHeaderProps) => {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push('/login');
  };

  return (
    <HeaderWrapper $bgColor={bgColor} $color={color}>
      {page === 'main' && <Image src='/images/mainImage.svg' alt='' width={80} height={30} />}
      {page === 'review' && <Image src='/images/splash.svg' alt='' width={80} height={30} />}
      <UserIconButton>
        <AiOutlineUser size={30} onClick={handleClickLogin} />
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
  cursor: pointer;
`;

export default Header;
