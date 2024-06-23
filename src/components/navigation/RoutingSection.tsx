import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PiArrowBendUpLeftBold, PiArrowBendUpRightBold } from 'react-icons/pi';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import SCREEN_SIZE from '@constants/sizes';
import { changeCurrentPosition, getDistanceCurrentToTarget } from '@utils/map';
import useNavigationInfo from 'src/hooks/useNavigationInfo';

const options = {
  enableHighAccuracy: false,
  maximumAge: 30000,
  timeout: 10000
};

const RoutingSection = () => {
  const router = useRouter();
  const watchId = useRef(0);

  const markerIndexRef = useRef(0);
  const [diffPosition, setDiffPosition] = useState(0); // 현재 좌표와 첫번째 경로 사이의 거리

  const { mapRef, currentPositionMarkerRef, markerListRef } = useNavigationInfo();

  const handleError = useCallback(() => {
    (err: any) => {
      alert('GPS가 원활하지 않습니다. 새로고침 해주세요.');
      router.push('/');
    };
  }, [router]);

  // 위치가 바뀔 때마다 첫 번째 경로의 위도, 경도와 거리 계산
  const handlePosition = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    changeCurrentPosition(mapRef.current, currentPositionMarkerRef.current, lat, lng);

    // 현재 좌표와 타겟 좌표 사이의 거리 계산
    const length = markerListRef.current.length;
    if (markerListRef.current.length > 0 && markerIndexRef.current < length) {
      const { latitude, longitude } = markerListRef.current[markerIndexRef.current];
      const diff = getDistanceCurrentToTarget({ lat, lng }, { latitude, longitude });
      setDiffPosition(diff);
      if (diff < 5) markerIndexRef.current++;
    }
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
  }, [handleError]);

  return (
    <HeaderWrapper>
      <RoutingWrapper>
        <RoutingFirstSection style={FONT.HEADLINE1}>
          <RoutingLeftWrapper>
            <PiArrowBendUpRightBold size={40} />
            <div style={{ fontSize: '60%' }}>
              {(markerListRef.current.length > 0 &&
                markerListRef.current[markerIndexRef.current].description) ||
                '로딩중...'}
            </div>
          </RoutingLeftWrapper>
          <div>{diffPosition}m</div>
        </RoutingFirstSection>

        <RoutingSecondSection style={FONT.BODY1}>
          <RoutingLeftWrapper>
            <PiArrowBendUpLeftBold size={40} />
            <div style={{ fontSize: '60%' }}>
              {(markerListRef.current.length > 0 &&
                markerListRef.current[markerIndexRef.current + 1].description) ||
                '로딩중...'}
            </div>
          </RoutingLeftWrapper>

          <div>
            {(markerListRef.current.length > 0 &&
              diffPosition +
                parseInt(markerListRef.current[markerIndexRef.current + 1].distance)) ||
              '0'}
            m
          </div>
        </RoutingSecondSection>
      </RoutingWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20vh;
  width: ${SCREEN_SIZE.WIDTH};
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
