import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { changeCurrentPosition, getDistanceCurrentToTarget } from '@utils/map';
import { NavigationMarker } from 'types/map';

const options = {
  enableHighAccuracy: false,
  maximumAge: 30000,
  timeout: 10000
};

interface WatchPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface UseTrackLocationProps {
  map: Tmapv2.Map | null;
  currentPositionMarker: Tmapv2.Marker | null;
  turnPointMarkerList: NavigationMarker[];
}

const useTrackLocation = ({
  map,
  currentPositionMarker,
  turnPointMarkerList
}: UseTrackLocationProps) => {
  const router = useRouter();
  const watchId = useRef(0);
  const markerIndexRef = useRef(0);
  const [diffPosition, setDiffPosition] = useState(0); // 현재 좌표와 첫번째 경로 사이의 거리

  // 위치가 바뀔 때마다 첫 번째 경로의 위도, 경도와 거리 계산
  const handlePosition = useCallback((position: WatchPosition) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    changeCurrentPosition(map, currentPositionMarker, lat, lng);

    // 현재 좌표와 타겟 좌표 사이의 거리 계산
    const length = turnPointMarkerList.length;
    if (turnPointMarkerList.length > 0 && markerIndexRef.current < length) {
      const { latitude, longitude } = turnPointMarkerList[markerIndexRef.current];
      const diff = getDistanceCurrentToTarget({ lat, lng }, { latitude, longitude });
      setDiffPosition(diff);
      if (diff < 5) markerIndexRef.current++;
    }
  }, []);

  const handleError = useCallback(() => {
    (err: unknown) => {
      alert('GPS가 원활하지 않습니다. 새로고침 해주세요.');
      router.push('/');
    };
  }, [router]);

  useEffect(() => {
    // 위치정보 사용 가능
    if ('geolocation' in navigator) {
      watchId.current = navigator.geolocation.watchPosition(handlePosition, handleError, options);
    } else {
      alert('위치 정보를 사용할 수 없는 장소입니다.');
    }

    return () => {
      if (watchId.current) return navigator.geolocation.clearWatch(watchId.current);
    };
  }, [handlePosition, handleError]);

  return { markerIndexRef, diffPosition };
};

export default useTrackLocation;
