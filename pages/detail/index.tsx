import SearchBar from '@/components/common/SearchBar';
import InfoSection from '@/components/placeList/InfoSection';
import PlaceItem from '@/components/placeList/PlaceItem';
import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import Image from 'next/image';
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
      <div style={{ height: '20vh', backgroundColor: COLOR.GREY }}></div>
      <InfoSection place={selectedPlace} />
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
  border: 1px solid black;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
  align-items: center;
  gap: 10px;
  height: 10vh;
`;

export default DetailPage;
