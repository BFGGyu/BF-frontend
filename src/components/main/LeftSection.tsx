import styled from 'styled-components';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Header from '@common/Header';
import SearchBar from '@common/SearchBar';
import { useState } from 'react';

const LeftSection = () => {
  const [inputText, setInputText] = useState('');

  console.log(inputText);
  return (
    <Wrapper>
      <Header bgColor={COLOR.BLUE1} color={COLOR.WHITE} />
      <SearchWrapper>
        <SearchBar />

        {/* <SearchInput
          style={FONT.BODY1}
          placeholder='검색어를 입력하세요.'
          value={inputText}
          onChange={(e: any) => setInputText(e.target.value)}
        /> */}
        {/* <SearchButton>
          <AiOutlineSearch />
        </SearchButton> */}
      </SearchWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // flex-basis: 40%;
  width: 30%;
  border: 1px solid black;
  height: 100vh;
`;

const SearchWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;

  align-items: center;
  justify-content: center;
  background-color: rgba(239, 241, 255, 0.4);
`;

// const SearchInput = styled.input`
//   width: 90%;
//   height: 7vh;
//   border: 0;
//   padding-left: 20px;
//   // color: ${COLOR.GREY};
//   background-color: rgba(239, 241, 255, 0.1);
//   &::placeholder {
//     color: ${COLOR.GREY};
//   }
// `;

// const SearchButton = styled.div`
//   display: flex;
//   flex-basis: 15%;
//   font-size: 20px;
//   justify-content: center;
// `;

export default LeftSection;
