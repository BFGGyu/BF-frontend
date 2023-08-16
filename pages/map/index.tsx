import Button from '@common/Button';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import InfoSection from 'src/components/place/InfoSection';
import { initRouteMap } from '@utils/map';
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getRoutingCoords, getSearchResult } from 'src/apis/map';
import { styled } from 'styled-components';
import { IPlace } from '@@types/facility';
import { IFacilityMarker } from '@@types/map';

const removeBlank = (query: string) => {
  return query.split('-').join('');
};

const MapPage: NextPage = () => {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const CURRENT_MAP = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState<IFacilityMarker>({} as IFacilityMarker);
  const [station, setStation] = useState({
    departure: '경복궁역',
    arrival: '국립고궁박물관'
  });

  useEffect(() => {
    const result = router.query.result;
    if (typeof result === 'string') {
      // 도착지는 url에서 받아오고, 출발지는 API 에서 받아옴
      getSearchResult(removeBlank(result)).then((data) => {
        setStation({ departure: data.station, arrival: removeBlank(result) });
        setSelectedPlace(data);
      });
      axios.get('/api/map').then((res) => {
        const { center, arrival, departure, markers, routes } = res.data.data;
        initRouteMap(center, departure, arrival, markers, routes).then((data) => {
          console.log('지도데이터 로딩 성공 !', data);
        });
      });
    }
  }, [router.query.result]);
  useEffect(() => {
    // 서버 연결
    // getRoutingCoords().then((data) => {
    //   initRouteMap(data.center, data.departure, data.arrival, data.markers, data.routes).then(
    //     (data) => {
    //       console.log('지도데이터 로딩 성공 !', data);
    //     }
    //   );
    // });
    // mock data
    // axios.get('/api/map').then((res) => {
    //   const { center, arrival, departure, markers, routes } = res.data.data;
    //   initRouteMap(center, departure, arrival, markers, routes).then((data) => {
    //     console.log('지도데이터 로딩 성공 !', data);
    //   });
    // });
  }, []);

  return (
    <>
      <PlaceSelectBarWrapper>
        <PlaceSelectBar>
          <PlaceLabel style={FONT.BODY2}>출발지</PlaceLabel>
          <StartPlace style={FONT.BODY1}>{station.departure}</StartPlace>
        </PlaceSelectBar>
        <PlaceSelectBar>
          <PlaceLabel style={FONT.BODY2}>도착지</PlaceLabel>
          <EndPlace style={FONT.BODY1} onClick={() => router.push('/search')}>
            {selectedPlace.name}
          </EndPlace>
        </PlaceSelectBar>
      </PlaceSelectBarWrapper>
      <MapWrapper>
        <MapDiv ref={mapRef} id='map_div'></MapDiv>
      </MapWrapper>

      <FooterInfoSection>
        <InfoWrapper>
          <LeftWrapper>
            {Object.keys(selectedPlace).length > 0 && <InfoSection place={selectedPlace} />}
          </LeftWrapper>
          <RightWrapper>
            <Button
              bgColor={COLOR.WHITE}
              color={COLOR.BLUE2}
              onClick={() => router.push('/detail')}
            >
              상세보기
            </Button>
          </RightWrapper>
        </InfoWrapper>
        <ButtonWrapper>
          <Button
            bgColor={COLOR.BLUE1}
            color={COLOR.WHITE}
            width='90%'
            height='50px'
            onClick={() => router.push('/navigation')}
            // onClick={() => startNavigation(CURRENT_MAP.current)}
          >
            안내시작
          </Button>
        </ButtonWrapper>
      </FooterInfoSection>
    </>
  );
};

const PlaceSelectBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 390px;
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

const MapWrapper = styled.div`
  height: 570px;
`;

const MapDiv = styled.div`
  position: absolute;
`;

const FooterInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 30vh;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 75%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid black;
  border-color: ${COLOR.BLUE1};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default MapPage;
