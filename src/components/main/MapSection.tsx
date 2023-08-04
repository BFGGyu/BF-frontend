import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../../pages/Loading';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initTmap = () => {
    // map 생성
    // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
    const map = new window.Tmapv2.Map('map_div', {
      center: new window.Tmapv2.LatLng(37.53084364186228, 127.078908811749), // 지도 초기 좌표
      width: '100%',
      height: '70vh',
      zoom: 12
    });

    // 출발
    const startMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.519892712436906, 127.02810900563199),

      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    // 도착
    const endMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.49288934463672, 127.11971717230388),

      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    // 경로1
    const pathMarker1 = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.5591696189164, 127.07389565460413),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    // 경로2
    const pathMarker2 = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.52127761904626, 127.13346617572014),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    setIsLoading(false);
  };

  useEffect(() => {
    initTmap();
  }, []);

  return (
    <MapWrapper>
      {isLoading && <Loading />}
      <div ref={mapRef} id='map_div'></div>
    </MapWrapper>
  );
};

export default MapSection;

const MapWrapper = styled.div`
  flex-basis: 70%;
`;
