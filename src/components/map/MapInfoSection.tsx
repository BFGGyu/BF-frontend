import { IFacilityMarker } from 'types/map';
import Button from '@common/Button';
import COLOR from '@constants/colors';
import InfoSection from '@place/InfoSection';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { styled } from 'styled-components';
import { handleClickMovePage } from '@utils/map';

const MapInfoSection = ({ arrival }: { arrival: string }) => {
  const router = useRouter();
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<IFacilityMarker>({} as IFacilityMarker);

  const handleClickHeart = () => {
    setIsHeart((prev) => !prev);
    // TODO: 찜하기 POST API 연결
  };

  return (
    <InfoWrapper>
      <InfoLeftWrapper>
        <InfoSection selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
      </InfoLeftWrapper>
      <InfoRightWrapper>
        <HeartWrapper onClick={handleClickHeart}>
          {isHeart ? <FaHeart size={20} color={COLOR.RED} /> : <FaRegHeart size={20} />}
        </HeartWrapper>
        <Button
          bgColor={COLOR.WHITE}
          color={COLOR.BLUE2}
          onClick={() => handleClickMovePage(router, '/detail', arrival)}
          width='100%'
        >
          상세보기
        </Button>
      </InfoRightWrapper>
    </InfoWrapper>
  );
};

const InfoLeftWrapper = styled.div`
  display: flex;
  flex-basis: 70%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const InfoRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
`;

const HeartWrapper = styled.div``;

const InfoWrapper = styled.div`
  display: flex;
  padding: 0px 10px;
  border-top: 1px solid ${COLOR.BLUE1};
`;

export default MapInfoSection;
