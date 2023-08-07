import Image from 'next/image';
import { styled } from 'styled-components';

interface IHeaderProps {
  bgColor?: string;
  color?: string;
}

const Header = ({ bgColor, color }: IHeaderProps) => {
  return (
    <HeaderWrapper $bgColor={bgColor} $color={color}>
      <Image src='/images/wheelChair.svg' alt='' width={25} height={25} />
      <ServiceName>서비스명</ServiceName>
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
  padding: 10px;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
`;

const ServiceName = styled.div``;

export default Header;
