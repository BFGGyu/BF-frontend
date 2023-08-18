import { FacilityType, IPlace } from '@@types/facility';
import { IFacilityMarker } from '@@types/map';
import { getSearchResult } from '@apis/map';
import SearchBar from '@common/SearchBar';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlaceItem from 'src/components/place/PlaceItem';
import styled from 'styled-components';

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [recentSearchList, setRecentSearchList] = useState([
    {
      id: 1,
      name: '국립고궁박물관',
      type: 'museum',
      contact: '02-3701-7500',
      address: '서울 종로구 효자로 12 국립고궁박물관',
      opening_time: '10:00',
      closing_time: '18:00',
      latitude: '37.5765513',
      longitude: '126.9756893',
      imageSrc: 'https://wheelpass.s3.ap-northeast-2.amazonaws.com/gomuseum.jpg'
    }
  ]);

  const [searchList, setSearchList] = useState<IFacilityMarker>({} as IFacilityMarker);

  useEffect(() => {
    if (typeof router.query.result === 'string') {
      setIsSearched(true);
      // 배열로 줄 경우 & 가공해야 하는 경우
      // getSearchResult(router.query.result).then((res) => {
      //   const result = res.map((data:IPlace) => ({
      //     id: data.id,
      //     name: data.name,
      //     type: data.type,
      //     address: data.address,
      //     opening_time: data.opening_time
      //   }))
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
            <SearchResult style={FONT.BODY1} key={recent.id}>
              {recent.name}
              <AiOutlineClose size={20} color={COLOR.GREY} />
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
