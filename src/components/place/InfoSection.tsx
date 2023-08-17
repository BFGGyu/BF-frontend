import { IFacilityMarker } from '@@types/map';
import { getDetailFacility, getSearchResult } from '@apis/map';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';

const PlaceTypeDic = {
  museum: '박물관',
  artGallery: '미술관',
  exhibition: '전시회'
};

interface IInfoSectionProps {
  selectedPlace: IFacilityMarker;
  setSelectedPlace: React.Dispatch<React.SetStateAction<IFacilityMarker>>;
}

const InfoSection = ({ selectedPlace, setSelectedPlace }: IInfoSectionProps) => {
  const router = useRouter();

  // const [selectedPlace, setSelectedPlace] = useState<IFacilityMarker>({} as IFacilityMarker);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedPlace).length > 0) {
      const currentHour = new Date().getHours();
      const openHour = parseInt(selectedPlace.opening_time.slice(0, 2));
      const closeHour = parseInt(selectedPlace.closing_time.slice(0, 2));
      if (openHour < currentHour && currentHour < closeHour) setIsOpened(true);
      else setIsOpened(false);
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (router.asPath.includes('/navigation')) {
      const query = decodeURIComponent(router.asPath.split('=')[1]);
      getDetailFacility(query).then((data) => {
        setSelectedPlace(data);
      });
    }

    if (router.pathname === '/detail') {
      const query = decodeURIComponent(router.asPath.split('=')[1]);
      getDetailFacility(query).then((data) => {
        setSelectedPlace(data);
      });
    }

    const result = router.query.result;
    if (typeof result === 'string') {
      getDetailFacility(result).then((data) => {
        setSelectedPlace(data);
      });
    }
  }, [router]);

  return (
    <>
      <PlaceHeadWrapper>
        <PlaceName style={FONT.HEADLINE2}>{selectedPlace.name}</PlaceName>
        <PlaceType style={FONT.BODY2} $type={selectedPlace.type}>
          {PlaceTypeDic[selectedPlace.type]}
        </PlaceType>
      </PlaceHeadWrapper>
      <PlaceLocation style={FONT.BODY2}>{selectedPlace.address}</PlaceLocation>
      <PlaceTimeWrapper style={FONT.BODY2}>
        {isOpened ? (
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
