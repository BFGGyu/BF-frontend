import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import useCreateTMap from './useCreateTMap';

import { getNavigationCoords } from '@apis/map';
import { initNavigationMap, speakNavigationGuide } from '@utils/map';
import { NavigationMarker } from 'types/map';

const useNavigationInfo = () => {
  const router = useRouter();
  const currentPositionMarkerRef = useRef<Tmapv2.Marker | null>(null);
  const [turnPointMarkerList, setTurnPointMarkerList] = useState<NavigationMarker[]>([]);

  const { mapRef } = useCreateTMap({
    zoom: 19
  });

  useEffect(() => {
    const initNavigation = async (currentMap: Tmapv2.Map) => {
      const query = decodeURIComponent(router.asPath.split('=')[1]);
      speakNavigationGuide('경로안내를 시작합니다');
      const navigationCoords = await getNavigationCoords(query);

      // API 응답값의 출발지로 지도 중심 설정
      currentMap.setCenter(
        new Tmapv2.LatLng(navigationCoords.departure.latitude, navigationCoords.departure.longitude)
      );

      const { currentPositionMarker, turnPointMarkerList } = await initNavigationMap({
        navigationCoords,
        currentMap
      });

      currentPositionMarkerRef.current = currentPositionMarker;
      setTurnPointMarkerList(turnPointMarkerList);
    };

    if (mapRef.current) {
      initNavigation(mapRef.current);
    }
  }, [router, mapRef]);

  return { turnPointMarkerList, currentPositionMarkerRef, mapRef };
};

export default useNavigationInfo;
