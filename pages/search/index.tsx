import { IFacilityMarker } from 'types/map';
import { getRecommendPlace, getSearchResult } from '@apis/map';
import SearchBar from '@common/SearchBar';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegThumbsUp } from 'react-icons/fa';
import PlaceItem from 'src/components/place/PlaceItem';
import styled from 'styled-components';

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [recentSearchList, setRecentSearchList] = useState<IFacilityMarker[]>([]);

  useEffect(() => {
    getRecommendPlace(5).then((data) => {
      console.log('FooterSection: ', data);
      setRecentSearchList(data);
    });
  }, []);

  const [searchList, setSearchList] = useState<IFacilityMarker>({} as IFacilityMarker);

  const handleClickSearchList = (name: string) => {
    router.push('/map', {
      query: { result: name }
    });
  };

  useEffect(() => {
    if (typeof router.query.result === 'string') {
      setIsSearched(true);
      // 배열로 줄 경우 & 가공해야 하는 경우
      // getSearchResult(router.query.result).then((res) => {
      //   setSearchList(result);
      // });

      // 잘 줄 경우
      getSearchResult(router.query.result).then((data) => {
        if (data !== undefined) setSearchList(data);
      });
      setKeyword(router.query.result);
    }
  }, [router.query.result]);

  return (
    <SearchWrapper>
      <SearchBar keyword={keyword} setIsSearched={setIsSearched} />

      {isSearched ? (
        Object.keys(searchList).length > 0 ? (
          <>
            {/* 배열로 줄 경우 */}
            {/* {searchList.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))} */}
            <PlaceItem place={searchList} setSearchList={setSearchList} />
          </>
        ) : (
          <NoSearchResult>
            <NoSearchText style={FONT.BODY1}>검색결과가 없습니다.</NoSearchText>
            <Image src='/images/reviewImage.svg' alt='' width={300} height={100} />
          </NoSearchResult>
        )
      ) : (
        <>
          {/* 최근 검색어 배열로 줄 경우 */}
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

export default Search;
