import { PiArrowBendUpLeftBold, PiArrowBendUpRightBold } from 'react-icons/pi';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import SCREEN_SIZE from '@constants/sizes';
import useNavigationInfo from 'src/hooks/useNavigationInfo';
import useTrackLocation from 'src/hooks/useTrackLocation';

const RoutingSection = () => {
  const { mapRef, currentPositionMarkerRef, turnPointMarkerList } = useNavigationInfo();
  const { markerIndexRef, diffPosition } = useTrackLocation({
    map: mapRef.current,
    currentPositionMarker: currentPositionMarkerRef.current,
    turnPointMarkerList
  });

  return (
    <HeaderWrapper>
      <RoutingWrapper>
        <RoutingFirstSection style={FONT.HEADLINE1}>
          <RoutingLeftWrapper>
            <PiArrowBendUpRightBold size={40} />
            <NavigationText>
              {(turnPointMarkerList.length > 0 &&
                turnPointMarkerList[markerIndexRef.current].description) ||
                '로딩중...'}
            </NavigationText>
          </RoutingLeftWrapper>
          <div>{diffPosition}m</div>
        </RoutingFirstSection>

        <RoutingSecondSection style={FONT.BODY1}>
          <RoutingLeftWrapper>
            <PiArrowBendUpLeftBold size={40} />
            <NavigationText>
              {(turnPointMarkerList.length > 0 &&
                turnPointMarkerList[markerIndexRef.current + 1].description) ||
                '로딩중...'}
            </NavigationText>
          </RoutingLeftWrapper>

          <NavigationText>
            {(turnPointMarkerList.length > 0 &&
              diffPosition + parseInt(turnPointMarkerList[markerIndexRef.current + 1].distance)) ||
              '0'}
            m
          </NavigationText>
        </RoutingSecondSection>
      </RoutingWrapper>
    </HeaderWrapper>
  );
};

const NavigationText = styled.span`
  font-size: 60%;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20vh;
  width: ${SCREEN_SIZE.WIDTH};
  position: absolute;
  z-index: 1;
`;

const RoutingWrapper = styled.div`
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

export default RoutingSection;
