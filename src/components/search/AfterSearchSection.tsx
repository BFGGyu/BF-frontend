import FONT from '@constants/fonts';
import PlaceItem from '@place/PlaceItem';
import Image from 'next/image';
import React from 'react';
import { styled } from 'styled-components';

const AfterSearchSection = ({ searchList, setSearchList }: any) => {
  // 검색을 한 경우 검색결과가 있으면 검색결과, 없으면 텍스트와 팬더이미지 띄우기
  return Object.keys(searchList).length > 0 ? (
    <PlaceItem place={searchList} setSearchList={setSearchList} />
  ) : (
    <NoSearchResult>
      <NoSearchText style={FONT.BODY1}>검색결과가 없습니다.</NoSearchText>
      <Image src='/images/reviewImage.svg' alt='' width={300} height={100} />
    </NoSearchResult>
  );
};

const NoSearchResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 20px;
`;

const NoSearchText = styled.div``;

export default AfterSearchSection;
