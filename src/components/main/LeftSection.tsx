import styled from 'styled-components';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Header from '@common/Header';
import SearchBar from '@common/SearchBar';
import { useState } from 'react';

const LeftSection = () => {
  const router = useRouter();

  const [inputText, setInputText] = useState('');

  // const handleClickSearch = () => {
  //   router.push('/search');
  // };
  console.log(inputText);
  return (
    <Wrapper>
      <Header bgColor={COLOR.BLUE1} color={COLOR.WHITE} />
      <SearchWrapper>
        <SearchInput
          style={FONT.BODY1}
          placeholder='검색어를 입력하세요.'
          value={inputText}
          onChange={(e: any) => setInputText(e.target.value)}
        />
        {/* <SearchBar keyword={keyword} setIsSearched={setIsSearched} /> */}
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
  // flex-basis: 40%;
  width: 35%;
  border: 1px solid black;
  height: 100vh;
`;

const SearchWrapper = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  flex-basis: 25%;
  margin-top: 10px;
  // margin-bottom: 20px;
  padding: 20px;

  align-items: center;
  justify-content: center;
  background-color: rgba(239, 241, 255, 0.4);
`;

const SearchInput = styled.input`
  width: 90%;
  height: 7vh;
  border: 0;
  padding-left: 20px;
  // color: ${COLOR.GREY};
  background-color: rgba(239, 241, 255, 0.1);
  &::placeholder {
    color: ${COLOR.GREY};
  }
`;

const SearchButton = styled.div`
  display: flex;
  flex-basis: 15%;
  font-size: 20px;
  justify-content: center;
`;

export default LeftSection;
