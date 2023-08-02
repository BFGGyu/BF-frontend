import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../src/constants/fonts';
import Loading from '../Loading';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

function initTmap() {
  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
  const map = new Tmapv2.Map('map_div', {
    center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
    width: '890px',
    height: '400px',
    zoom: 15
  });
}

const Index: NextPage = () => {
  // const [map, setMap] = useState(null);
  // const mapRef = useRef<HTMLDivElement | null>(null);
  // const [currentCoords, setCurrentCoords] = useState({ lat: 0, lng: 0 });
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // // 현재 위치(위도, 경도) 가져온다.
  // const getPosSuccess = async (pos: GeolocationPosition) => {
  //   setCurrentCoords({
  //     lat: pos.coords.latitude,
  //     lng: pos.coords.longitude
  //   });
  //   setIsLoading(false);

  //   if (mapRef.current) mapRef.current.style.display = 'block';
  // };

  // const getCurrentPosition = async () => {
  //   navigator.geolocation.getCurrentPosition(
  //     getPosSuccess,
  //     () => alert('위치 정보를 가져오는데 실패했습니다.'),
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 30000,
  //       timeout: 27000
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getCurrentPosition();
  // }, []);

  // useEffect(() => {
  //   const newMap = new window.google.maps.Map(mapRef.current, {
  //     center: { lat: currentCoords.lat, lng: currentCoords.lng },
  //     zoom: 16
  //   });
  //   setMap(newMap);
  //   console.log('무한렌더링 방지: ', currentCoords.lat);
  // }, [currentCoords]);

  const handleClick = () => {
    initTmap();
  };

  return (
    <>
      <h1>지도 페이지</h1>
      {/* {isLoading && <Loading />} */}
      {/* <div ref={mapRef} id='map' style={{ display: 'none', width: '100%', height: '100%' }}></div> */}
      <div onClick={handleClick}>지도 생성</div>
      <div id='map_div'></div>
    </>
  );
};

export default Index;
