import React, { useEffect, useRef, useState } from 'react';
import { BiMapAlt } from 'react-icons/bi';
import styled from 'styled-components';
import RoutingSection from '@navigation/RoutingSection';
import COLOR from '@constants/colors';
import Button from '@common/Button';
import SCREEN_SIZE from '@constants/sizes';
import { useRouter } from 'next/router';

const NavigationPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [result, setResult] = useState('');

  const handleClickMap = () => {
    router.push('/map', {
      query: { result }
    });
  };

  const handleClickEndNavigation = () => {
    router.push('/review', {
      query: { result }
    });
  };

  useEffect(() => {
    const query = decodeURIComponent(router.asPath.split('=')[1]);
    setResult(query);
  }, [router]);

  return (
    <div>
      <RoutingSection />
      <MapWrapper>
        <MapDiv ref={mapRef} id='map_div'></MapDiv>
      </MapWrapper>
      <FooterWrapper>
        <MapIconWrapper>
          <BiMapAlt color={COLOR.BLUE1} size={30} onClick={handleClickMap} />
        </MapIconWrapper>
        <ButtonWrapper onClick={handleClickEndNavigation}>
          <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} height='50px'>
            경로안내 마치기
          </Button>
        </ButtonWrapper>
      </FooterWrapper>
    </div>
  );
};

const ButtonWrapper = styled.div`
  width: inherit;
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
  width: ${SCREEN_SIZE.WIDTH};
  padding: 30px 20px;
  position: absolute;
  z-index: 1;
  bottom: 0;
`;

export default NavigationPage;
