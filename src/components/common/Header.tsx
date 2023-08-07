import Image from 'next/image';
import { styled } from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <Image src='/images/wheelChair.svg' alt='' width={25} height={25} />
      <ServiceName>서비스명</ServiceName>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  height: 5vh;
  gap: 5px;
  align-items: center;
  padding: 10px;
`;

const ServiceName = styled.div``;

export default Header;
