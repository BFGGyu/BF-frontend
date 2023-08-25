import COLOR from '@constants/colors';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';
import Button from '@common/Button';
import InfoSection from './InfoSection';
import { IFacilityMarker } from 'types/map';
import React, { useEffect, useState } from 'react';
import { getRecommendPlace } from '@apis/map';

interface IPlaceItemProps {
  place: IFacilityMarker;
  setSearchList: React.Dispatch<React.SetStateAction<IFacilityMarker>>;
}

const PlaceItem = ({ place, setSearchList }: IPlaceItemProps) => {
  const router = useRouter();
  // const [selectedPlace, setSelectedPlace] = useState<IFacilityMarker[]>([]);

  const routeMap = () => {
    router.push({
      pathname: '/map',
      query: { result: router.query.result }
    });
  };

  return (
    <SearchListWrapper key={place.id}>
      <LeftWrapper>
        <InfoSection selectedPlace={place} setSelectedPlace={setSearchList} />
      </LeftWrapper>
      <RightWrapper>
        <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} onClick={routeMap}>
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
