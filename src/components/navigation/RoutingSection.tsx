import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import {
  changeCurrentPostion,
  getDistanceCurrentToTarget,
  initNavigationTmap,
  speakNavigationGuide
} from '@utils/map';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { PiArrowBendUpLeftBold, PiArrowBendUpRightBold } from 'react-icons/pi';
import { styled } from 'styled-components';

interface INavigationMarker {
  latitude: string;
  longitude: string;
  description: string;
  distance: string;
}

const options = {
  enableHighAccuracy: false,
  maximumAge: 50000,
  timeout: 50000
};

const handleError = (err: any) => {
  console.log('geolocation ERROR: ', err);
  alert('GPS가 원활하지 않습니다. 새로고침 해주세요.');
};

const RoutingSection = () => {
  const currentMapRef = useRef(null);
  const startMarkerRef = useRef(null);
  const watchId = useRef<number>();

  // navigation 데이터 리스트
  const markerList = useRef<INavigationMarker[]>([]);
  const markerIndexRef = useRef<number>(0);
  const [diffPosition, setDiffPosition] = useState<number>(0); // 현재 좌표와 첫번째 경로 사이의 거리

  // 위치가 바뀔 때마다 첫 번째 경로의 위도, 경도와 거리 계산
  const handlePosition = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    changeCurrentPostion(currentMapRef.current, startMarkerRef.current, lat, lng);

    // 현재 좌표와 타겟 좌표 사이의 거리 계산
    if (markerList.current.length > 0) {
      console.log('왜없음?:', markerList.current);
      const { latitude, longitude } = markerList.current[markerIndexRef.current];
      const diff = getDistanceCurrentToTarget({ lat, lng }, { latitude, longitude });
      setDiffPosition(diff);
    }
  };

  useEffect(() => {
    speakNavigationGuide('경로안내를 시작합니다');
    // // 서버 연결
    // getNavigationCoords().then((data) => {
    //   initNavigationTmap(data.departure, data.arrival, data.markers, data.routes).then((data) => {
    //     console.log('지도데이터 로딩 성공 !', data);
    //     currentMapRef.current = data[0];
    //     startMarkerRef.current = data[1];
    //     markerList.current = data[2];
    //   });
    // });

    // mock data
    axios.get('/api/path').then((res) => {
      const { arrival, departure, markers, routes } = res.data.data;
      initNavigationTmap(departure, arrival, markers, routes).then((data) => {
        console.log('지도데이터 로딩 성공 !', data);
        currentMapRef.current = data[0];
        startMarkerRef.current = data[1];
        markerList.current = data[2];
      });
    });
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      /* 위치정보 사용 가능 */
      watchId.current = navigator.geolocation.watchPosition(handlePosition, handleError, options);
    } else {
      /* 위치정보 사용 불가능 */
      alert('위치 정보를 사용할 수 없는 장소입니다.');
    }

    return () => {
      if (watchId.current) return navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  return (
    <HeaderWrapper>
      <RoutingWrapper>
        <RoutingFirstSection style={FONT.HEADLINE1}>
          <RoutingLeftWrapper>
            <PiArrowBendUpRightBold size={40} />
            <div style={{ fontSize: '60%' }}>
              {markerList.current.length > 0 &&
                markerList.current[markerIndexRef.current].description}
            </div>
          </RoutingLeftWrapper>
          <div>{diffPosition}m</div>
        </RoutingFirstSection>

        <RoutingSecondSection style={FONT.BODY1}>
          <RoutingLeftWrapper>
            <PiArrowBendUpLeftBold size={40} />
            <div style={{ fontSize: '60%' }}>
              {markerList.current.length > 0 && markerList.current[1].description}
            </div>
          </RoutingLeftWrapper>
          <div>{markerList.current.length > 0 && markerList.current[1].distance}m</div>
        </RoutingSecondSection>
      </RoutingWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20vh;
  width: 390px;
  position: absolute;
  z-index: 1;
`;

const RoutingWrapper = styled.div`
  width: 90%;
  height: 80%;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.36);
  background: rgba(255, 255, 255, 0.8);
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(4px);
  }
`;

const RoutingFirstSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60%;
  align-items: center;
  padding: 0px 20px;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
`;

const RoutingSecondSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40%;
  align-items: center;
  padding: 0px 20px;
  color: ${COLOR.GREY};
`;

const RoutingLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export default RoutingSection;