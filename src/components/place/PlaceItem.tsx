import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import InfoSection from './InfoSection';

import Button from '@common/Button';
import COLOR from '@constants/colors';
import { handleClickMovePage } from '@utils/map';
import useQueryString from 'src/hooks/useQueryString';
import { IFacilityMarker } from 'types/map';

interface PlaceItemProps {
  place: IFacilityMarker;
}

const PlaceItem = ({ place }: PlaceItemProps) => {
  const router = useRouter();
  const result = useQueryString();

  return (
    <SearchListWrapper key={place.id}>
      <LeftWrapper>
        <InfoSection selectedPlace={place} />
      </LeftWrapper>
      <RightWrapper>
        <Button
          bgColor={COLOR.BLUE1}
          color={COLOR.WHITE}
          onClick={() => handleClickMovePage(router, '/map', result)}
        >
          길찾기
        </Button>
      </RightWrapper>
    </SearchListWrapper>
  );
};

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 80%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchListWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
`;

export default PlaceItem;
