import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

import FooterInfoSection from '@map/FooterInfoSection';
import PlaceSelectSection from '@map/PlaceSelectSection';
import { initRouteMap } from '@utils/map';
import { getRoutingCoords } from 'src/apis/map';
import useQueryParams from 'src/hooks/useQueryParams';
import { IStation, ITotalRouteResult } from 'types/map';

const MapPage: NextPage = () => {
  const searchResult = useQueryParams();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [station, setStation] = useState<IStation>({
    departure: '로딩중...',
    arrival: '로딩중...'
  });
  const [routeResult, setRouteResult] = useState<ITotalRouteResult>({
    distance: '-',
    duration: 0
  });

  useEffect(() => {
    if (searchResult) {
      getRoutingCoords(searchResult).then((data) => {
        const { departure, arrival, routes } = data;
        setStation({ departure: departure.name, arrival: arrival.name });
        initRouteMap({ departure, arrival, routes }).then((data) => {
          const { distance, duration } = data;
          setRouteResult({ distance, duration });
        });
      });
    }
  }, [searchResult]);

  return (
    <>
      <PlaceSelectSection departure={station.departure} arrival={station.arrival} />
      <MapWrapper>
        <MapDiv ref={mapRef} id='map_div'></MapDiv>
      </MapWrapper>
      <FooterInfoSection
        arrival={station.arrival}
        routeResult={routeResult}
        searchResult={searchResult}
      />
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
