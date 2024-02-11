import Image from 'next/image';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { PLACE_DIC } from '@constants/map';
import { IFacilityMarker } from 'types/map';

interface IInfoSectionProps {
  selectedPlace: IFacilityMarker;
}

const InfoSection = ({ selectedPlace }: IInfoSectionProps) => {
  return (
    <>
      <PlaceHeadWrapper>
        <PlaceName style={FONT.HEADLINE2}>{selectedPlace.name}</PlaceName>
        <PlaceType style={FONT.BODY2} $type={selectedPlace.type}>
          {PLACE_DIC[selectedPlace.type]}
        </PlaceType>
      </PlaceHeadWrapper>
      <PlaceLocation style={FONT.BODY2}>{selectedPlace.address}</PlaceLocation>
      <PlaceTimeWrapper style={FONT.BODY2}>
        {isOpened(selectedPlace) ? (
          <>
            <div style={{ color: COLOR.GREEN }}>운영중</div>
            <div>{selectedPlace.closing_time} 에 운영종료</div>
          </>
        ) : (
          <>
            <div style={{ color: COLOR.RED }}>운영종료</div>
            <div>{selectedPlace.opening_time} 에 운영시작</div>
          </>
        )}
      </PlaceTimeWrapper>
      <IconWrapper>
        <Image src='/images/wheelChair.svg' alt='wheelChair' width={30} height={30} />
        <Image src='/images/elevator.svg' alt='elevator' width={30} height={30} />
        <Image src='/images/slope.svg' alt='slope' width={30} height={30} />
      </IconWrapper>
    </>
  );
};

const isOpened = (selectedPlace: IFacilityMarker) => {
  const currentHour = new Date().getHours();
  const openHour = parseInt(selectedPlace.opening_time.slice(0, 2));
  const closeHour = parseInt(selectedPlace.closing_time.slice(0, 2));
  return openHour < currentHour && currentHour < closeHour;
};

interface PlaceTypeProps {
  $type: string;
}

type ObjType = {
  [index: string]: string;
};

const TYPE_TO_COLOR: ObjType = {
  museum: COLOR.ORANGE,
  artGallery: COLOR.GREEN,
  exhibition: COLOR.RED
};

const PlaceType = styled.div<PlaceTypeProps>`
  color: ${(props) => TYPE_TO_COLOR[props.$type]};
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

const IconWrapper = styled.div`
  display: flex;
  flex-basis: 20%;
  gap: 5px;
`;

export default InfoSection;
