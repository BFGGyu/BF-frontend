import Button from '@common/Button';
import COLOR from '@constants/colors';
import InfoSection from '@PlaceItem/InfoSection';
import { initRouteMap } from '@utils/maps';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

let CURRENT_MAP: any;
const MapPage: NextPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedPlace, setSelectedPlace] = useState({
    id: '0',
    name: '국립 고궁 박물관',
    type: '박물관',
    location: '서울 종로구 세종로',
    startTimeAt: '10:00'
  });

  useEffect(() => {
    initRouteMap(CURRENT_MAP);
  }, []);

  return (
    <>
      <PlaceSelectBarWrapper>
        <PlaceSelectBar>
          <div>출발지</div>
          <div>현위치</div>
        </PlaceSelectBar>
        <PlaceSelectBar>
          <div>도착지</div>
          <div>국립 고궁 박물관</div>
        </PlaceSelectBar>
      </PlaceSelectBarWrapper>
      <div style={{ width: 390, height: 400, backgroundColor: 'grey' }}>
        {/* <div style={{ position: 'absolute' }}> */}
        {/* <div ref={mapRef} id='map_div'></div> */}
        {/* </div> */}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', height: '30vh' }}>
        <div
          style={{
            display: 'flex',
            padding: 10,
            borderTop: '1px solid black',
            borderColor: COLOR.BLUE1
          }}
        >
          <LeftWrapper>
            <InfoSection place={selectedPlace} />
          </LeftWrapper>
          <RightWrapper>
            <Button bgColor={COLOR.WHITE} color={COLOR.BLUE2}>
              상세보기
            </Button>
          </RightWrapper>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} width='90%' height='50px'>
            안내시작
          </Button>
        </div>
      </div>
    </>
  );
};

const PlaceSelectBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 390px;
  padding: 10px;
  border: 1px solid black;
`;

const PlaceSelectBar = styled.div`
  display: flex;
  gap: 20px;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.16);
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 75%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default MapPage;
