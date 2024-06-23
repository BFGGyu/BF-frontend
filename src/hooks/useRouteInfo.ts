import { useEffect, useState } from 'react';

import useCreateTMap from './useCreateTMap';
import useQueryParams from './useQueryParams';

import { getRoutingCoords } from '@apis/map';
import { initRouteMap } from '@utils/map';
import { IStation, ITotalRouteResult } from 'types/map';

const useRouteInfo = () => {
  const { mapRef } = useCreateTMap({
    height: '606px',
    zoom: 15,
    pinchZoom: true,
    zoomControl: false,
    scrollwheel: false
  });

  const searchResult = useQueryParams();
  const [station, setStation] = useState<IStation>({
    departure: '로딩중...',
    arrival: '로딩중...'
  });
  const [routeResult, setRouteResult] = useState<ITotalRouteResult>({
    distance: '-',
    duration: 0
  });

  useEffect(() => {
    const initRoute = async (searchResult: string, currentMap: Tmapv2.Map) => {
      const routingCoords = await getRoutingCoords(searchResult);
      const { distance, duration } = await initRouteMap({
        routingCoords,
        currentMap
      });

      setStation({ departure: routingCoords.departure.name, arrival: routingCoords.arrival.name });
      setRouteResult({ distance, duration });
    };

    if (searchResult && mapRef.current) {
      initRoute(searchResult, mapRef.current);
    }
  }, [searchResult, mapRef]);

  return { station, routeResult, searchResult };
};

export default useRouteInfo;
