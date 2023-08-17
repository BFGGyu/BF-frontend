import Button from '@common/Button';
import COLOR from '@constants/colors';
import InfoSection from '@place/InfoSection';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { styled } from 'styled-components';

const MapInfoSection = ({ arrival }: { arrival: string }) => {
  const router = useRouter();
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const handleClickHeart = () => {
    setIsHeart((prev) => !prev);
    // TODO: 찜하기 POST API 연결
  };

  const handleClickDetail = () => {
    router.push('/detail', {
      query: { result: arrival }
    });
  };

  return (
    <InfoWrapper>
      <InfoLeftWrapper>
        <InfoSection />
      </InfoLeftWrapper>
      <InfoRightWrapper>
        <HeartWrapper onClick={handleClickHeart}>
          {isHeart ? <FaHeart size={20} color={COLOR.RED} /> : <FaRegHeart size={20} />}
        </HeartWrapper>
        <Button bgColor={COLOR.WHITE} color={COLOR.BLUE2} onClick={handleClickDetail}>
          상세보기
        </Button>
      </InfoRightWrapper>
    </InfoWrapper>
  );
};

const InfoLeftWrapper = styled.div`
  display: flex;
  flex-basis: 75%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const InfoRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
`;

const HeartWrapper = styled.div``;

const InfoWrapper = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid ${COLOR.BLUE1};
`;

export default MapInfoSection;
