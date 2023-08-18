import FooterSection from '@main/FooterSection';
import LeftSection from '@main/LeftSection';
import MapSection from '@main/MapSection';
import { styled } from 'styled-components';

const MainPage = () => {
  return (
    <SectionWrapper>
      <LeftSection />
      <MapSection />
      {/* <FooterSection /> */}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export default MainPage;
