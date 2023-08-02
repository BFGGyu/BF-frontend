import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/colors';
import FONT from '../../constants/fonts';
import { AiOutlineSearch } from 'react-icons/ai';

const HeaderSection = () => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <div style={{ width: 25, height: 25, background: COLOR.WHITE }}></div>
        <div>서비스명</div>
      </HeaderWrapper>
      <BodyWrapper>
        <MainTextWrapper>
          <div style={FONT.HEADLINE1}>
            원하는 문화시설을 <br />
            검색해보세요!
          </div>
          <div style={FONT.BODY1}>휠체어 이용자를 위한 안전한 경로 안내</div>
        </MainTextWrapper>
        <div>아이콘</div>
      </BodyWrapper>
      <SearchWrapper>
        <SearchInput placeholder='검색어를 입력하세요.'></SearchInput>
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
  flex-basis: 25%;
  border: 3px solid black;
  background-color: ${COLOR.BLUE1};
  color: ${COLOR.WHITE};
  padding-left: 1rem;
  padding-right: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-basis: 20%;
  gap: 5px;
  align-items: center;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-basis: 60%;
  justify-content: space-between;
`;

const MainTextWrapper = styled.div`
  display: flex;
  flex-basis: 70%;
  flex-wrap: wrap;
  align-items: center;
  gap: 0px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-basis: 25%;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.BLUE2};
  border-radius: 20px;
`;

const SearchInput = styled.input`
  width: 90%;
  border: 0;
  padding-left: 10px;
  margin-left: 5px;
  background-color: ${COLOR.BLUE2};
  color: ${COLOR.WHITE};
  &::placeholder {
    color: ${COLOR.WHITE};
  }
`;

const SearchButton = styled.div`
  display: flex;
  flex-basis: 15%;
  font-size: 20px;
  justify-content: center;
  cursor: pointer;
`;

export default HeaderSection;
