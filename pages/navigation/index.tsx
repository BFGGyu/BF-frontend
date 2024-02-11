import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { BiMapAlt } from 'react-icons/bi';
import styled from 'styled-components';

import Button from '@common/Button';
import COLOR from '@constants/colors';
import SCREEN_SIZE from '@constants/sizes';
import RoutingSection from '@navigation/RoutingSection';
import { handleClickMovePage } from '@utils/map';
import useQueryString from 'src/hooks/useQueryString';

const NavigationPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const result = useQueryString();

  return (
    <div>
      <RoutingSection />
      <MapWrapper>
        <MapDiv ref={mapRef} id='map_div'></MapDiv>
      </MapWrapper>
      <FooterWrapper>
        <MapIconWrapper>
          <BiMapAlt
            color={COLOR.BLUE1}
            size={30}
            onClick={() => handleClickMovePage(router, '/map', result)}
          />
        </MapIconWrapper>
        <ButtonWrapper onClick={() => handleClickMovePage(router, '/review', result)}>
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
