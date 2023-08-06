import COLOR from '@constants/colors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';

interface ISearchBarProps {
  keyword?: string | string[];
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ keyword, isSearched, setIsSearched }: ISearchBarProps) => {
  const router = useRouter();
  const [inputText, setInputText] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const goBackSearch = () => {
    router.push({
      pathname: '/search'
    });
    setInputText('');
    setIsSearched(false);
  };

  useEffect(() => {
    if (typeof keyword === 'string') setInputText(keyword);
  }, [keyword]);

  return (
    <SearchInputWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <BsArrowLeft color={COLOR.GREY} size={25} />
        <SearchInput
          placeholder='검색어를 입력하세요.'
          value={inputText}
          onChange={handleChangeInput}
        />
      </div>
      {isSearched ? (
        <Link href='/search'>
          <AiOutlineClose size={30} color={COLOR.GREY} onClick={goBackSearch} />
        </Link>
      ) : (
        <SearchButton
          onClick={() =>
            router.push({
              pathname: '/search',
              query: { result: inputText }
            })
          }
        >
          <AiOutlineSearch size={30} color={COLOR.GREY} />
        </SearchButton>
      )}
    </SearchInputWrapper>
  );
};

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 10px;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
`;

const SearchInput = styled.input`
  border: 0;
  padding-right: 65%;
  font-size: 16px;
  &::placeholder {
    color: ${COLOR.GREY};
  }
`;

const SearchButton = styled.div`
  display: flex;
  cursor: pointer;
`;

export default SearchBar;
