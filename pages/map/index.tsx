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
    const initRoute = async (searchResult: string) => {
      const { departure, arrival, routes } = await getRoutingCoords(searchResult);
      const { distance, duration } = await initRouteMap({ departure, arrival, routes });

      setStation({ departure: departure.name, arrival: arrival.name });
      setRouteResult({ distance, duration });
    };

    if (searchResult) {
      initRoute(searchResult);
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
