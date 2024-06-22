import { useEffect, useRef } from 'react';

import { ELEMENT_ID } from '@constants/map';
import SCREEN_SIZE from '@constants/sizes';

const useCreateTMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // TMAP 인스턴스 생성
    mapRef.current = new window.Tmapv2.Map(ELEMENT_ID, {
      center: new window.Tmapv2.LatLng(37.5, 126.9), // 지도 초기 좌표
      width: SCREEN_SIZE.WIDTH,
      height: '100%',
      zoom: 8,
      pinchZoom: true,
      scrollWheel: true,
      zoomControl: true
    });

    // 메모리 누수 방지
    return () => {
      if (mapRef.current) {
        (mapRef.current as InstanceType<typeof window.Tmapv2.Map>).destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return { mapRef };
};

export default useCreateTMap;
