import { IFacilityMarker } from '@@types/map';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { styled } from 'styled-components';

interface IInfoSectionProps {
  place: IFacilityMarker;
}

const PlaceTypeDic = {
  museum: '박물관',
  artGallery: '미술관',
  exhibition: '전시회'
};

const InfoSection = ({ place }: IInfoSectionProps) => {
  return (
    <>
      <PlaceHeadWrapper>
        <PlaceName style={FONT.HEADLINE2}>{place.name}</PlaceName>
        <PlaceType style={FONT.BODY2} $type={place.type}>
          {PlaceTypeDic[place.type]}
        </PlaceType>
      </PlaceHeadWrapper>
      <PlaceLocation style={FONT.BODY2}>{place.address}</PlaceLocation>
      <PlaceTimeWrapper style={FONT.BODY2}>
        <div style={{ color: COLOR.RED }}>운영종료</div>
        <div>{place.opening_time} 에 운영시작</div>
      </PlaceTimeWrapper>
      <IconWrapper>
        <Image src='/images/wheelChair.svg' alt='wheelChair' width={30} height={30} />
        <Image src='/images/elevator.svg' alt='elevator' width={30} height={30} />
        <Image src='/images/slope.svg' alt='slope' width={30} height={30} />
      </IconWrapper>
    </>
  );
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
  flexbasis: 20%;
  gap: 5px;
`;

export default InfoSection;
