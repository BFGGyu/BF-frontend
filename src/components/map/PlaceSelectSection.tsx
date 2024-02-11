import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import SCREEN_SIZE from '@constants/sizes';
import { IStation } from 'types/map';

const PlaceSelectSection = ({ station }: { station: IStation }) => {
  const router = useRouter();

  return (
    <PlaceSelectBarWrapper onClick={() => router.push('/search')}>
      <PlaceSelectBar>
        <PlaceLabel style={FONT.BODY2}>출발지</PlaceLabel>
        <StartPlace style={FONT.BODY1}>{station.departure}</StartPlace>
      </PlaceSelectBar>
      <PlaceSelectBar>
        <PlaceLabel style={FONT.BODY2}>도착지</PlaceLabel>
        <EndPlace style={FONT.BODY1}>{station.arrival}</EndPlace>
      </PlaceSelectBar>
    </PlaceSelectBarWrapper>
  );
};

const PlaceSelectBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: ${SCREEN_SIZE.WIDTH};
  padding: 10px;
  position: absolute;
  z-index: 1;
`;

const PlaceSelectBar = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
  }
`;

const StartPlace = styled.div``;

const EndPlace = styled.div``;

const PlaceLabel = styled.div`
  color: ${COLOR.BLUE1};
`;

export default PlaceSelectSection;
