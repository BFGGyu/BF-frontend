import Button from '@/components/common/Button';
import SearchBar from '@/components/common/SearchBar';
import PlaceItem from '@/components/placeList/PlaceItem';
import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchResultIndex = ({ result }: { result: string }) => {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<string>('');
  const [searchList, setSearchList] = useState([
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
    setSearchResult(result);
  }, [result]);

  return (
    <>
      <SearchBar text={result} />
      <div>
        {searchList.map((place) => (
          <PlaceItem place={place} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query: { result } }: { query: { result: string } }) => {
  // fetching data here
  // Return the data as props
  return {
    props: { result }
  };
};

export default SearchResultIndex;
