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
import { IFacilityMarker, IStation, ITotalRouteResult } from '@@types/map';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import MapInfoSection from 'src/components/map/MapInfoSection';
import SCREEN_SIZE from '@constants/sizes';
import PlaceSelectSection from 'src/components/map/PlaceSelectSection';

const MapPage: NextPage = () => {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement | null>(null);
  // const [selectedPlace, setSelectedPlace] = useState<IFacilityMarker>({} as IFacilityMarker);
  const [station, setStation] = useState<IStation>({
    departure: '로딩중...',
    arrival: '로딩중...'
  });

  const [routeResult, setRouteResult] = useState<ITotalRouteResult>({
    distance: '-',
    duration: 0
  });

  const [result, setResult] = useState('');

  const handleClickNavigation = () => {
    router.push('/navigation', {
      query: { result }
    });
  };

  useEffect(() => {
    const queryData = router.query.result;

    console.log('map router:', router);
    if (
      router.asPath.includes('/navigation') ||
      router.asPath.includes('/main') ||
      router.asPath.includes('/search')
    ) {
      const query = decodeURIComponent(router.asPath.split('=')[1]);
      console.log('map query:', query);
      setResult(query);
      getRoutingCoords(query).then((data) => {
        const { departure, arrival, routes } = data;
        setStation({ departure: departure.name, arrival: arrival.name });
        initRouteMap(departure, arrival, routes).then((data) => {
          console.log('지도데이터 로딩 성공 !');
          const { distance, duration } = data;
          setRouteResult({ distance, duration });
        });
      });
    } else if (typeof queryData === 'string') {
      getRoutingCoords(queryData).then((data) => {
        const { departure, arrival, routes } = data;
        setResult(queryData);
        setStation({ departure: departure.name, arrival: arrival.name });
        initRouteMap(departure, arrival, routes).then((data) => {
          console.log('지도데이터 로딩 성공 !');
          const { distance, duration } = data;
          setRouteResult({ distance, duration });
        });
      });
    }
  }, [router]);

  return (
    <>
      <PlaceSelectSection station={station} />

      <MapWrapper>
        <MapDiv ref={mapRef} id='map_div'></MapDiv>
      </MapWrapper>

      <FooterInfoSection>
        <MapInfoSection arrival={station.arrival} />
        <RouteResultWrapper>
          <DistanceWrapper>
            <ArriveText style={FONT.BODY2}>도착예정</ArriveText>
            <DataUnitWrapper>
              <TotalDistance style={FONT.HEADLINE1}>{routeResult.distance} </TotalDistance>
              <ResultUnit style={FONT.BODY2}>m</ResultUnit>
            </DataUnitWrapper>
          </DistanceWrapper>
          <DataUnitWrapper>
            <TotalDuration style={FONT.HEADLINE1}>{routeResult.duration}</TotalDuration>
            <ResultUnit style={FONT.BODY2}>분</ResultUnit>
          </DataUnitWrapper>
        </RouteResultWrapper>

        <ButtonWrapper>
          <Button
            bgColor={COLOR.BLUE1}
            color={COLOR.WHITE}
            width='90%'
            height='40px'
            onClick={handleClickNavigation}
          >
            안내시작
          </Button>
        </ButtonWrapper>
      </FooterInfoSection>
    </>
  );
};

const MapWrapper = styled.div`
  height: 650px;
`;

const MapDiv = styled.div`
  position: absolute;
`;

const FooterInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
`;

// const InfoLeftWrapper = styled.div`
//   display: flex;
//   flex-basis: 75%;
//   flex-direction: column;
//   gap: 10px;
//   padding: 20px;
// `;

// const InfoRightWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px 0px;
// `;

// const HeartWrapper = styled.div``;

// const InfoWrapper = styled.div`
//   display: flex;
//   padding: 10px;
//   border-top: 1px solid ${COLOR.BLUE1};
// `;

const RouteResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  padding-bottom: 10px;
`;

const DistanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ArriveText = styled.div`
  color: ${COLOR.BLUE1};
`;

const DataUnitWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TotalDistance = styled.div``;

const ResultUnit = styled.div``;

const TotalDuration = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default MapPage;
