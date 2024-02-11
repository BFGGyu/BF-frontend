import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'styled-components';

import Button from '@common/Button';
import COLOR from '@constants/colors';
import SCREEN_SIZE from '@constants/sizes';
import InfoSection from '@place/InfoSection';
import { handleClickMovePage } from '@utils/map';
import useQueryString from 'src/hooks/useQueryString';
import { IFacilityMarker } from 'types/map';

interface IPlaceInfoSectionProps {
  selectedPlace: IFacilityMarker;
  setSelectedPlace: React.Dispatch<React.SetStateAction<IFacilityMarker>>;
}

const PlaceInfoSection = ({ selectedPlace, setSelectedPlace }: IPlaceInfoSectionProps) => {
  const router = useRouter();
  const result = useQueryString();

  return (
    <>
      <ImageWrapper>
        {selectedPlace.imageSrc && (
          <Image
            src={selectedPlace.imageSrc}
            alt='시설 이미지'
            width={SCREEN_SIZE.WIDTH}
            height={170}
          />
        )}
      </ImageWrapper>
      <PlaceInfomation>
        <LeftWrapper>
          <InfoSection selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
        </LeftWrapper>
        <RightWrapper>
          <Button
            bgColor={COLOR.BLUE1}
            color={COLOR.WHITE}
            onClick={() => handleClickMovePage(router, '/navigation', result)}
          >
            길찾기
          </Button>
        </RightWrapper>
      </PlaceInfomation>
    </>
  );
};

const ImageWrapper = styled.div`
  height: 22vh;
`;

const PlaceInfomation = styled.div`
  display: flex;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 80%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`;

export default PlaceInfoSection;
