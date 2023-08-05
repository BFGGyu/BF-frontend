import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import Image from 'next/image';
import React from 'react';
import { styled } from 'styled-components';
import Button from '../common/Button';
import InfoSection from './InfoSection';

interface IPlace {
  id: string;
  name: string;
  type: string;
  location: string;
  startTimeAt: string;
}

interface IPlaceItemProps {
  place: IPlace;
}

const PlaceItem = ({ place }: IPlaceItemProps) => {
  return (
    <SearchListWrapper key={place.id}>
      <LeftWrapper>
        <InfoSection place={place} />
      </LeftWrapper>
      <RightWrapper>
        <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE}>
          길찾기
        </Button>
      </RightWrapper>
    </SearchListWrapper>
  );
};

const IconWrapper = styled.div`
  display: flex;
  flexbasis: 20%;
  gap: 5px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 80%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

interface PlaceTypeProps {
  type: string;
}

type ObjType = {
  [index: string]: string;
};

const TYPE_TO_COLOR: ObjType = {
  박물관: COLOR.ORANGE,
  미술관: COLOR.GREEN,
  전시회: COLOR.RED
};

const PlaceType = styled.div<PlaceTypeProps>`
  color: ${(props) => TYPE_TO_COLOR[props.type]};
`;

const PlaceHeadWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PlaceName = styled.div``;

const PlaceLocation = styled.div`
  color: ${COLOR.GREY};
`;

const PlaceTimeWrapper = styled.div`
  display: flex;
  gap: 10px;
  color: ${COLOR.GREY};
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
