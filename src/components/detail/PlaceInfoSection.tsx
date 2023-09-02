import Button from '@common/Button';
import COLOR from '@constants/colors';
import SCREEN_SIZE from '@constants/sizes';
import InfoSection from '@place/InfoSection';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useQueryString from 'src/hooks/useQueryString';
import { styled } from 'styled-components';

const PlaceInfoSection = ({ selectedPlace, setSelectedPlace }: any) => {
  const router = useRouter();
  // const [result, setResult] = useState<string>('');
  const result = useQueryString();

  const handleClickNavigation = () => {
    router.push('/navigation', {
      query: { result }
    });
  };

  // useEffect(() => {
  //   const query = decodeURIComponent(router.asPath.split('=')[1]);
  //   setResult(query);
  // }, [router]);

  return (
    <>
      <ImageSection>
        {selectedPlace.imageSrc && (
          <Image
            src={selectedPlace.imageSrc}
            alt='시설 이미지'
            width={SCREEN_SIZE.WIDTH}
            height={170}
          />
        )}
      </ImageSection>
      <PlaceInfomation>
        <LeftWrapper>
          <InfoSection selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
        </LeftWrapper>
        <RightWrapper>
          <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} onClick={handleClickNavigation}>
            길찾기
          </Button>
        </RightWrapper>
      </PlaceInfomation>
    </>
  );
};

const ImageSection = styled.div`
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
