import styled from 'styled-components';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Header from '@common/Header';

const HeaderSection = () => {
  const router = useRouter();

  const handleClickSearch = () => {
    router.push('/search');
  };

  return (
    <Wrapper>
      <Header type='white' />
      <BodyWrapper>
        <MainTextWrapper>
          <MainText style={FONT.HEADLINE1}>
            <span style={{ lineHeight: 1.5 }}>원하는 문화시설을</span>
            <span>검색해보세요!</span>
          </MainText>
        </MainTextWrapper>

        <SubText style={FONT.BODY1}>휠체어 이용자를 위한 안전한 경로 안내</SubText>
      </BodyWrapper>
      <SearchWrapper onClick={handleClickSearch}>
        <SearchDiv>검색어를 입력하세요.</SearchDiv>
        <SearchButton>
          <AiOutlineSearch />
        </SearchButton>
      </SearchWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  background-color: ${COLOR.BLUE1};
  color: ${COLOR.WHITE};
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-basis: 60%;
  flex-direction: column;
  align-items: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const MainTextWrapper = styled.div`
  display: flex;
  flex-basis: 70%;
  flex-wrap: wrap;
  align-items: center;
  gap: 0px;
`;

const MainText = styled.div`
  width: 50vw;
`;

const SubText = styled.div``;

const GuideButton = styled.div``;

const SearchWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-basis: 25%;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.BLUE2};
  border-radius: 100px;
  cursor: pointer;
`;

const SearchDiv = styled.div`
  width: 90%;
  border: 0;
  padding-left: 20px;
  background-color: ${COLOR.BLUE2};
  color: ${COLOR.WHITE};
`;

const SearchButton = styled.div`
  display: flex;
  flex-basis: 15%;
  font-size: 20px;
  justify-content: center;
`;

export default HeaderSection;
