import SearchBar from '@/components/common/SearchBar';
import COLOR from '@/constants/colors';
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
      location: '서울 종로구 세종로'
    },
    {
      id: '1',
      name: '국립 현대 미술관',
      type: '미술관',
      location: '서울 종로구 소격동'
    },

    {
      id: '2',
      name: '진격의 거인전',
      type: '전시회',
      location: '서울 마포구 서교동'
    }
  ]);

  useEffect(() => {
    setSearchResult(result);
  }, [result]);

  return (
    <>
      <SearchBar text={result} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid black',
          borderColor: COLOR.LINE
        }}
      >
        {searchList.map((result) => (
          <div
            key={result.id}
            style={{ display: 'flex', borderBottom: '1px solid black', borderColor: COLOR.LINE }}
          >
            <div
              style={{
                display: 'flex',
                flexBasis: '80%',
                flexDirection: 'column',
                gap: 10,
                padding: 20
              }}
            >
              <div style={{ display: 'flex', gap: 10 }}>
                <div>{result.name}</div>
                <div>{result.type}</div>
              </div>
              <div>{result.location}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div>운영종료</div>
                <div>10:00시에 운영시작</div>
              </div>
              <IconWrapper>
                <Image src='/images/wheelChair.svg' width={30} height={30} />
                <Image src='/images/elevator.svg' width={30} height={30} />
                <Image src='/images/slope.svg' width={30} height={30} />
              </IconWrapper>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RouteButton>길찾기</RouteButton>
            </div>
          </div>
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

const IconWrapper = styled.div`
  display: flex;
  flexbasis: 20%;
  gap: 5px;
`;

const RouteButton = styled.div`
  background-color: ${COLOR.BLUE1};
  color: white;
  padding: 10px;
  width: 20%
  height: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SearchResultIndex;
