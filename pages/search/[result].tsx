import SearchBar from '@/components/common/SearchBar';
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
        {searchList.map((result) => (
          <SearchListWrapper key={result.id}>
            <LeftWrapper>
              <PlaceHeadWrapper>
                <PlaceName style={FONT.HEADLINE2}>{result.name}</PlaceName>
                <PlaceType style={FONT.BODY2} type={result.type}>
                  {result.type}
                </PlaceType>
              </PlaceHeadWrapper>
              <PlaceLocation style={FONT.BODY2}>{result.location}</PlaceLocation>
              <PlaceTimeWrapper style={FONT.BODY2}>
                <div style={{ color: COLOR.RED }}>운영종료</div>
                <div>{result.startTimeAt} 에 운영시작</div>
              </PlaceTimeWrapper>
              <IconWrapper>
                <Image src='/images/wheelChair.svg' width={30} height={30} />
                <Image src='/images/elevator.svg' width={30} height={30} />
                <Image src='/images/slope.svg' width={30} height={30} />
              </IconWrapper>
            </LeftWrapper>
            <RightWrapper>
              <RouteButton>길찾기</RouteButton>
            </RightWrapper>
          </SearchListWrapper>
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

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 80%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

interface PlaceTypeProps {
  type: string;
}

type ObjType = {
  [index: string]: string;
};

const TYPE_TO_COLOR: ObjType = {
  박물관: COLOR.ORANGE,
  미술관: COLOR.GREEN,
  전시회: COLOR.RED
};

const PlaceType = styled.div<PlaceTypeProps>`
  color: ${(props) => TYPE_TO_COLOR[props.type]};
`;

const PlaceHeadWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PlaceName = styled.div``;

const PlaceLocation = styled.div`
  color: ${COLOR.GREY};
`;

const PlaceTimeWrapper = styled.div`
  display: flex;
  gap: 10px;
  color: ${COLOR.GREY};
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
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
  cursor: pointer;
`;

const SearchListWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
`;

export default SearchResultIndex;
