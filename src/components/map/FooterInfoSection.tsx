import { IStation, ITotalRouteResult } from 'types/map';
import Button from '@common/Button';
import COLOR from '@constants/colors';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import MapInfoSection from './MapInfoSection';
import RouteResultSection from './RouteResultSection';
import { handleClickMovePage } from '@utils/map';

interface IFooterInfoSectionProps {
  station: IStation;
  routeResult: ITotalRouteResult;
  searchResult: string;
}

const FooterInfoSection = ({ station, routeResult, searchResult }: IFooterInfoSectionProps) => {
  const router = useRouter();

  return (
    <FooterInfoWrapper>
      <MapInfoSection arrival={station.arrival} />
      <RouteResultSection routeResult={routeResult} />
      <ButtonWrapper>
        <Button
          bgColor={COLOR.BLUE1}
          color={COLOR.WHITE}
          width='90%'
          height='40px'
          onClick={() => handleClickMovePage(router, '/navigation', searchResult)}
        >
          안내시작
        </Button>
      </ButtonWrapper>
    </FooterInfoWrapper>
  );
};

const FooterInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default FooterInfoSection;
