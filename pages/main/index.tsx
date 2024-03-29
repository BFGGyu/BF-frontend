import { styled } from 'styled-components';

import FooterSection from '@main/FooterSection';
import HeaderSection from '@main/HeaderSection';
import MapSection from '@main/MapSection';

const MainPage = () => {
  return (
    <SectionWrapper>
      <HeaderSection />
      <MapSection />
      <FooterSection />
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default MainPage;
