import { initRouteMap } from '@utils/map';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getRoutingCoords } from 'src/apis/map';
import { styled } from 'styled-components';
import { IStation, ITotalRouteResult } from 'types/map';
import PlaceSelectSection from '@map/PlaceSelectSection';
import FooterInfoSection from '@map/FooterInfoSection';

const MapPage: NextPage = () => {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [station, setStation] = useState<IStation>({
    departure: '로딩중...',
    arrival: '로딩중...'
  });
  const [routeResult, setRouteResult] = useState<ITotalRouteResult>({
    distance: '-',
    duration: 0
  });
  const [searchResult, setSearchResult] = useState<string>('');

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
      setSearchResult(query);
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
        setSearchResult(queryData);
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
      <FooterInfoSection station={station} routeResult={routeResult} searchResult={searchResult} />
    </>
  );
};

const MapWrapper = styled.div`
  height: 606px;
`;

const MapDiv = styled.div`
  position: absolute;
`;

export default MapPage;
