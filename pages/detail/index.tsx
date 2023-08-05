import Button from '@/components/common/Button';
import InfoSection from '@/components/placeList/InfoSection';
import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { styled } from 'styled-components';

const DetailPage = () => {
  const [selectedPlace, setSelectedPlace] = useState({
    id: '0',
    name: '국립 고궁 박물관',
    type: '박물관',
    location: '서울 종로구 세종로',
    startTimeAt: '10:00'
  });

  return (
    <DetailWrapper>
      <HeaderWrapper>
        <BsArrowLeft color={COLOR.GREY} size={25} />
        <div style={FONT.BODY1}>고궁 박물관</div>
      </HeaderWrapper>
      <ImageSection></ImageSection>
      <div style={{ display: 'flex' }}>
        <LeftWrapper>
          <InfoSection place={selectedPlace} />
        </LeftWrapper>
        <RightWrapper>
          <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE}>
            길찾기
          </Button>
        </RightWrapper>
      </div>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  gap: 10px;
  height: 10vh;
`;

const ImageSection = styled.div`
  height: 20vh;
  background-color: ${COLOR.GREY};
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

export default DetailPage;
