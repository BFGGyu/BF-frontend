import SearchBar from '@/components/common/SearchBar';
import COLOR from '@/constants/colors';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchResultIndex = () => {
  const router = useRouter();

  const [searchResult, setSearchResult] = useState<string>('');

  useEffect(() => {
    if (typeof router.query.result === 'string') setSearchResult(router.query.result);
  });
  return (
    <>
      <SearchBar text={router.query.result} />
      <div style={{ display: 'flex', borderBottom: '1px solid black' }}>
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
            <div>국립고궁 박물관</div>
            <div>박물관</div>
          </div>
          <div>서울 종로구 세종로</div>
          <div style={{ display: 'flex' }}>
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
    </>
  );
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
