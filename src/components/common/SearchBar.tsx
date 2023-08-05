import COLOR from '@/constants/colors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';

interface ISearchBar {
  text?: string | string[];
}

const SearchBar = ({ text }: ISearchBar) => {
  const router = useRouter();

  const [inputText, setInputText] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (typeof text === 'string') setInputText(text);
  }, []);

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
      {text ? (
        <Link href='/search'>
          <AiOutlineClose size={30} color={COLOR.GREY} />
        </Link>
      ) : (
        <SearchButton
          onClick={() =>
            router.push(
              {
                pathname: '/search/[result]',
                query: { result: inputText }
              },
              `/search?result=${inputText}`
            )
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
