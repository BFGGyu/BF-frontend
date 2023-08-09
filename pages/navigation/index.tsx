import Button from '@common/Button';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import SCREEN_SIZE from '@constants/sizes';
import { initTmap } from '@utils/maps';
import React, { useEffect, useRef } from 'react';
import { BiMapAlt } from 'react-icons/bi';
import { PiArrowBendUpLeftBold, PiArrowBendUpRightBold } from 'react-icons/pi';
import styled from 'styled-components';

const NavigationPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initTmap();
  }, []);
  return (
    <div>
      <HeaderWrapper>
        <RoutingSection>
          <RoutingFirstSection style={FONT.HEADLINE1}>
            <RoutingLeftWrapper>
              <PiArrowBendUpRightBold size={40} />
              <div>장애물</div>
            </RoutingLeftWrapper>
            <div>21m</div>
          </RoutingFirstSection>

          <RoutingSecondSection style={FONT.BODY1}>
            <RoutingLeftWrapper>
              <PiArrowBendUpLeftBold size={40} />
              <div>장애물</div>
            </RoutingLeftWrapper>
            <div>22m</div>
          </RoutingSecondSection>
        </RoutingSection>
      </HeaderWrapper>
      <MapWrapper>
        <MapDiv ref={mapRef} id='map_div'></MapDiv>
      </MapWrapper>
      <FooterWrapper>
        <MapIconWrapper>
          <BiMapAlt color={COLOR.BLUE1} size={30} />
        </MapIconWrapper>
        <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} height='50px'>
          경로안내 마치기
        </Button>
      </FooterWrapper>
    </div>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20vh;
  width: 390px;
  position: absolute;
  z-index: 1;
`;

const RoutingSection = styled.div`
  width: 90%;
  height: 80%;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.36);
  background: rgba(255, 255, 255, 0.8);
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(4px);
  }
`;

const RoutingFirstSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60%;
  align-items: center;
  padding: 0px 20px;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
`;

const RoutingSecondSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40%;
  align-items: center;
  padding: 0px 20px;
  color: ${COLOR.GREY};
`;

const RoutingLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MapWrapper = styled.div`
  height: ${SCREEN_SIZE.HEIGHT};
`;

const MapDiv = styled.div`
  position: absolute;
`;

const MapIconWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 100px;
  border-color: ${COLOR.BLUE1};
  padding: 10px;
  cursor: pointer;
`;

const FooterWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 390px;
  position: absolute;
  z-index: 1;
`;

export default NavigationPage;
