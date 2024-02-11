import Image from 'next/image';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import Button from '@common/Button';
import COLOR from '@constants/colors';
import SCREEN_SIZE from '@constants/sizes';
import InfoSection from '@place/InfoSection';
import { handleClickMovePage } from '@utils/map';
import { IFacilityMarker } from 'types/map';

interface PlaceInfoSectionProps {
  selectedPlace: IFacilityMarker;
  result: string;
}

const PlaceInfoSection = ({ selectedPlace, result }: PlaceInfoSectionProps) => {
  const router = useRouter();

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
      <PlaceInformation>
        <LeftWrapper>
          <InfoSection selectedPlace={selectedPlace} />
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
      </PlaceInformation>
    </>
  );
};

const ImageWrapper = styled.div`
  height: 22vh;
`;

const PlaceInformation = styled.div`
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
