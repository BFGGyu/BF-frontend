import Button from '@common/Button';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import SCREEN_SIZE from '@constants/sizes';
import { changeCurrentPostion, initNavigationTmap } from '@utils/map';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { BiMapAlt } from 'react-icons/bi';
import { PiArrowBendUpLeftBold, PiArrowBendUpRightBold } from 'react-icons/pi';
import styled from 'styled-components';

interface ICoord {
  latitude: string;
  longitude: string;
}

interface IRoute {
  id: number;
  latitude: string;
  longitude: string;
  path_id: number;
}

const options = {
  enableHighAccuracy: false,
  maximumAge: 10000,
  timeout: 20000
};

const handleError = (err: any) => {
  console.log('geolocation ERROR: ', err);
  alert('GPS가 원활하지 않습니다. 새로고침 해주세요.');
};

const NavigationPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentMapRef = useRef(null);
  const startMarkerRef = useRef(null);
  const watchId = useRef<number>();

  const speakStartNavigation = () => {
    const voice = '경로안내를 시작합니다';
    const utterance = new SpeechSynthesisUtterance(voice);
    speechSynthesis.speak(utterance);
  };

  const handlePosition = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    changeCurrentPostion(currentMapRef.current, startMarkerRef.current, lat, lng);
  };

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

  useEffect(() => {
    speakStartNavigation();
    axios.get('/api/path').then((res) => {
      const { arrival, departure, markers, routes } = res.data.data;
      initNavigationTmap(departure, arrival, markers, routes).then((data) => {
        console.log('지도데이터 로딩 성공 !', data);
        currentMapRef.current = data[0];
        startMarkerRef.current = data[1];
      });
    });
    // initNavigationTmap(departure, arrival, markers,routes).then((data) => {
    //   console.log('지도데이터 로딩 성공 !', data);
    //   currentMapRef.current = data[0];
    //   startMarkerRef.current = data[1];
    // });
  }, []);
  return (
    <div>
      <HeaderWrapper>
        <RoutingSection>
          <RoutingFirstSection style={FONT.HEADLINE1}>
            <RoutingLeftWrapper>
              <PiArrowBendUpRightBold size={40} />
              <div>장애물</div>
            </RoutingLeftWrapper>
            <div>21m</div>
          </RoutingFirstSection>

          <RoutingSecondSection style={FONT.BODY1}>
            <RoutingLeftWrapper>
              <PiArrowBendUpLeftBold size={40} />
              <div>장애물</div>
            </RoutingLeftWrapper>
            <div>22m</div>
          </RoutingSecondSection>
        </RoutingSection>
      </HeaderWrapper>
      <MapWrapper>
        <MapDiv ref={mapRef} id='map_div'></MapDiv>
      </MapWrapper>
      <FooterWrapper>
        <MapIconWrapper>
          <BiMapAlt color={COLOR.BLUE1} size={30} />
        </MapIconWrapper>
        <Link href='/review'>
          <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} height='50px'>
            경로안내 마치기
          </Button>
        </Link>
      </FooterWrapper>
    </div>
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

const RoutingSection = styled.div`
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

const MapWrapper = styled.div`
  height: ${SCREEN_SIZE.HEIGHT};
`;

const MapDiv = styled.div`
  position: absolute;
`;

const MapIconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 100px;
  border-color: ${COLOR.BLUE1};
  padding: 10px;
  cursor: pointer;
  background-color: ${COLOR.WHITE};
`;

const FooterWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 390px;
  padding: 30px 20px;
  position: absolute;
  z-index: 1;
  bottom: 0;
`;

export default NavigationPage;
