import { IFacilityMarker } from 'types/map';
import { getRecommendPlace, getSearchResult } from '@apis/map';
import SearchBar from '@common/SearchBar';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';
import PlaceItem from 'src/components/place/PlaceItem';
import styled from 'styled-components';

const SearchPage = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [recentSearchList, setRecentSearchList] = useState<IFacilityMarker[]>([]);
  const [searchList, setSearchList] = useState<IFacilityMarker>({} as IFacilityMarker);

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

  useEffect(() => {
    const result = router.query.result;
    if (typeof result === 'string') {
      setIsSearched(true);
      getSearchResult(result).then((data) => {
        if (data !== undefined) setSearchList(data);
      });
      setKeyword(result);
    }
  }, [router.query.result]);

  return (
    <SearchWrapper>
      <SearchBar keyword={keyword} setIsSearched={setIsSearched} />

      {/* 검색을 한 경우 검색결과가 있으면 검색결과, 없으면 텍스트와 팬더이미지 띄우기 */}
      {isSearched ? (
        Object.keys(searchList).length > 0 ? (
          <PlaceItem place={searchList} setSearchList={setSearchList} />
        ) : (
          <NoSearchResult>
            <NoSearchText style={FONT.BODY1}>검색결과가 없습니다.</NoSearchText>
            <Image src='/images/reviewImage.svg' alt='' width={300} height={100} />
          </NoSearchResult>
        )
      ) : (
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
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  cursor: pointer;
`;

const NoSearchResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 20px;
`;

const NoSearchText = styled.div``;

export default SearchPage;
