import Image from 'next/image';
import React from 'react';
import { styled } from 'styled-components';

import FONT from '@constants/fonts';
import PlaceItem from '@place/PlaceItem';
import { useSearchQuery } from 'src/hooks/useSearchQuery';

interface AfterSearchSectionProps {
  keyword: string;
}

const AfterSearchSection = ({ keyword }: AfterSearchSectionProps) => {
  const searchList = useSearchQuery(keyword);

  return searchList ? (
    <PlaceItem place={searchList} />
  ) : (
    <NoSearchResultWrapper>
      <NoSearchText style={FONT.BODY1}>검색결과가 없습니다.</NoSearchText>
      <Image src='/images/reviewImage.svg' alt='' width={300} height={100} />
    </NoSearchResultWrapper>
  );
};

const NoSearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 20px;
`;

const NoSearchText = styled.div``;

export default AfterSearchSection;
