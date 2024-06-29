import { useEffect, useRef } from 'react';

import { ELEMENT_ID } from '@constants/map';
import SCREEN_SIZE from '@constants/sizes';

interface TMapOptions extends Tmapv2.MapOptions {}

const useCreateTMap = (options?: TMapOptions) => {
  const mapRef = useRef<Tmapv2.Map | null>(null);

  useEffect(() => {
    // TMAP 인스턴스 생성
    mapRef.current = new Tmapv2.Map(ELEMENT_ID, {
      center: new Tmapv2.LatLng(37.5, 126.9), // 지도 초기 좌표
      width: SCREEN_SIZE.WIDTH,
      height: '100%',
      zoom: 8,
      pinchZoom: true,
      scrollWheel: true,
      zoomControl: true,
      httpsMode: process.env.NODE_ENV === 'production',
      ...options
    });

    // 메모리 누수 방지
    return () => {
      if (mapRef.current) {
        (mapRef.current as InstanceType<typeof Tmapv2.Map>).destroy();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { mapRef };
};

export default useCreateTMap;
