import { FacilityType, IPlace } from '@@types/facility';
import { IFacilityMarker } from '@@types/map';
import { getSearchResult } from '@apis/map';
import SearchBar from '@common/SearchBar';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlaceItem from 'src/components/place/PlaceItem';
import styled from 'styled-components';

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  // const [searchList, setSearchList] = useState<IFacilityMarker[]>([
  // {
  //   id: '0',
  //   name: '국립 고궁 박물관',
  //   type: 'museum',
  //   address: '서울 종로구 세종로',
  //   opening_time: '10:00'
  // },
  // {
  //   id: '1',
  //   name: '국립 현대 미술관',
  //   type: 'artGallery',
  //   address: '서울 종로구 소격동',
  //   opening_time: '9:30'
  // },
  // {
  //   id: '2',
  //   name: '진격의 거인전',
  //   type: 'exhibition',
  //   address: '서울 마포구 서교동',
  //   opening_time: '10:30'
  // }
  // ]);

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
        setSearchList(data);
      });
      setKeyword(router.query.result);
    }
  }, [router.query.result]);

  return (
    <SearchWrapper>
      <SearchBar keyword={keyword} setIsSearched={setIsSearched} />
      {isSearched ? (
        <>
          {/* 배열로 줄 경우 */}
          {/* {searchList.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))} */}
          <PlaceItem place={searchList} />
        </>
      ) : (
        <>
          {/* 배열로 줄 경우 */}
          {/* {searchList.map((result) => (
            <SearchResult style={FONT.BODY1} key={result.id}>
              {result.name}
              <AiOutlineClose size={20} color={COLOR.GREY} />
            </SearchResult>
          ))} */}
          {/* 객체로 줄 경우 */}
          <SearchResult style={FONT.BODY1}>
            {searchList.name}
            <AiOutlineClose size={20} color={COLOR.GREY} />
          </SearchResult>
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

export default Search;
