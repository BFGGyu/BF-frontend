import type { NextPage } from 'next';
import { styled } from 'styled-components';

import { ELEMENT_ID } from '@constants/map';
import FooterInfoSection from '@map/FooterInfoSection';
import PlaceSelectSection from '@map/PlaceSelectSection';
import useRouteInfo from 'src/hooks/useRouteInfo';

const MapPage: NextPage = () => {
  const { station, routeResult, searchResult } = useRouteInfo();

  return (
    <>
      <PlaceSelectSection departure={station.departure} arrival={station.arrival} />
      <MapWrapper>
        <MapDiv id={ELEMENT_ID}></MapDiv>
      </MapWrapper>
      <FooterInfoSection
        arrival={station.arrival}
        routeResult={routeResult}
        searchResult={searchResult}
      />
    </>
  );
};

const MapWrapper = styled.div`
  height: 606px;
`;

const MapDiv = styled.div`
  position: absolute;
`;

export default MapPage;
