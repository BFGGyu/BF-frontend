import SearchBar from '@common/SearchBar';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import PlaceItem from '@PlaceItem/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

interface IPlace {
  id: string;
  name: string;
  type: string;
  location: string;
  startTimeAt: string;
}

const Search = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchList, setSearchList] = useState<IPlace[]>([
    {
      id: '0',
      name: '국립 고궁 박물관',
      type: '박물관',
      location: '서울 종로구 세종로',
      startTimeAt: '10:00'
    },
    {
      id: '1',
      name: '국립 현대 미술관',
      type: '미술관',
      location: '서울 종로구 소격동',
      startTimeAt: '9:30'
    },

    {
      id: '2',
      name: '진격의 거인전',
      type: '전시회',
      location: '서울 마포구 서교동',
      startTimeAt: '10:30'
    }
  ]);

  useEffect(() => {
    if (typeof router.query.result === 'string') {
      setIsSearched(true);
      setKeyword(router.query.result);
    }
  }, [router.query.result]);

  return (
    <SearchWrapper>
      <SearchBar keyword={keyword} />
      {isSearched ? (
        <>
          {searchList.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </>
      ) : (
        <>
          {searchList.map((result) => (
            <SearchResult style={FONT.BODY1} key={result.id}>
              {result.name}
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

export default Search;
