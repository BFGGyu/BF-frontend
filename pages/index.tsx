import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loading from './Loading';

declare global {
  interface Window {
    google: any;
  }
}

const Index: NextPage = () => {
  const [map, setMap] = useState(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [currentCoords, setCurrentCoords] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 현재 위치(위도, 경도) 가져온다.
  const getPosSuccess = async (pos: GeolocationPosition) => {
    setCurrentCoords({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    });
    setIsLoading(false);

    if (mapRef.current) mapRef.current.style.display = 'block';
  };

  const getCurrentPosition = async () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보를 가져오는데 실패했습니다.'),
      {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 27000
      }
    );
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: currentCoords.lat, lng: currentCoords.lng },
      zoom: 14
    });
    setMap(newMap);
    console.log('무한렌더링 방지: ', currentCoords.lat);
  }, [currentCoords]);

  return (
    <MainContainer>
      <h1>지도 페이지</h1>
      {isLoading && <Loading />}
      <div ref={mapRef} id='map' style={{ display: 'none', width: '100%', height: '400px' }}></div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 399px;
  height: 844px;
  border: 2px solid black;
  margin: 0 auto;
`;

export default Index;
