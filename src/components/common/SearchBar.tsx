import COLOR from '@constants/colors';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';

interface ISearchBarProps {
  keyword?: string | string[];
  setIsSearched?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ setIsSearched }: ISearchBarProps) => {
  const router = useRouter();
  const [inputText, setInputText] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClickSearchBtn = () => {
    // 공백만 입력한 경우
    const blank_pattern = /^\s+|\s+$/g;
    if (inputText.replace(blank_pattern, '') == '') return;

    const spaceReg = inputText.replaceAll(' ', '-');
    router.push({
      pathname: '/search',
      query: { result: spaceReg }
    });
  };

  // const goBackSearch = useCallback(() => {
  //   router.push({
  //     pathname: '/search'
  //   });
  //   setInputText('');
  //   setIsSearched(false);
  // }, [router, setInputText, setIsSearched]);

  // useEffect(() => {
  //   if (typeof keyword === 'string') {
  //     const keywords = keyword.split('-').join(' ');
  //     setInputText(keywords);
  //   }
  // }, [keyword]);

  // useEffect(() => {
  //   window.addEventListener('popstate', goBackSearch);
  //   return () => window.removeEventListener('popstate', goBackSearch);
  // }, [goBackSearch]);

  return (
    <SearchInputWrapper>
      <LeftSection>
        <CursorWrapper>
          {/* <BsArrowLeft color={COLOR.GREY} size={25} onClick={goBackSearch} /> */}
        </CursorWrapper>
        <SearchInput
          placeholder='검색어를 입력하세요.'
          value={inputText}
          onChange={handleChangeInput}
        />
      </LeftSection>
      <RightSection>
        {inputText ? (
          <CursorWrapper>
            <AiFillCloseCircle size={20} color={COLOR.GREY} onClick={() => setInputText('')} />
          </CursorWrapper>
        ) : (
          <AiFillCloseCircle size={20} style={{ color: 'rgba(239, 241, 255, 0.4)' }} />
        )}
        <SearchButtonWrapper onClick={handleClickSearchBtn}>
          <AiOutlineSearch size={30} color={COLOR.GREY} />
        </SearchButtonWrapper>
      </RightSection>
    </SearchInputWrapper>
  );
};

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // height: 20vh;
  padding: 10px;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
`;

const LeftSection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-basis: 70%;
`;

const SearchInput = styled.input`
  border: 0;
  font-size: 16px;
  width: 100%;
  background-color: rgba(239, 241, 255, 0.4);
  &::placeholder {
    color: ${COLOR.GREY};
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-basis: 30%;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const CursorWrapper = styled.div`
  cursor: pointer;
`;

const SearchButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

export default SearchBar;
