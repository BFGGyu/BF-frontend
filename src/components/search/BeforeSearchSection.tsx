import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';
import { styled } from 'styled-components';

import { getRecommendPlace } from '@apis/map';
import FONT from '@constants/fonts';
import { IFacilityMarker } from 'types/map';

const BeforeSearchSection = () => {
  const router = useRouter();
  const [recentSearchList, setRecentSearchList] = useState<IFacilityMarker[]>([]);

  const handleClickSearchList = (searchResult: string) => {
    router.push('/map', {
      query: { result: searchResult }
    });
  };

  useEffect(() => {
    getRecommendPlace(5).then((data) => {
      setRecentSearchList(data);
    });
  }, []);

  return (
    <>
      {/* 검색을 안한 경우 최근검색어 띄워주기 */}
      {recentSearchList.map((recent) => (
        <SearchResult
          style={FONT.BODY1}
          key={recent.id}
          onClick={() => handleClickSearchList(recent.name)}
        >
          {recent.name}
          <FaRegThumbsUp size={20} />
        </SearchResult>
      ))}
    </>
  );
};

const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  cursor: pointer;
`;

export default BeforeSearchSection;
