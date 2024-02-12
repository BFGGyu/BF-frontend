import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import MapInfoSection from './MapInfoSection';
import RouteResultSection from './RouteResultSection';

import Button from '@common/Button';
import COLOR from '@constants/colors';
import { handleClickMovePage } from '@utils/map';
import { ITotalRouteResult } from 'types/map';

interface IFooterInfoSectionProps {
  arrival: string;
  routeResult: ITotalRouteResult;
  searchResult: string;
}

const FooterInfoSection = ({ arrival, routeResult, searchResult }: IFooterInfoSectionProps) => {
  const router = useRouter();

  return (
    <FooterInfoWrapper>
      <MapInfoSection arrival={arrival} />
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
