import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';

const Search = () => {
  const router = useRouter();

  const [inputText, setInputText] = useState<string>('');

  const [searchList, setSearchList] = useState([
    { id: '0', name: '국립 고궁 박물관' },
    { id: '1', name: '국립 현대 미술관' },
    { id: '2', name: '진격의 거인전' }
  ]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  return (
    <SearchWrapper>
      <SearchInputWrapper>
        <div style={{ display: 'flex', gap: 10 }}>
          <BsArrowLeft color={COLOR.GREY} size={25} />
          <SearchInput
            placeholder='검색어를 입력하세요.'
            value={inputText}
            onChange={handleChangeInput}
          />
        </div>
        <SearchButton
          onClick={() =>
            router.push(
              {
                pathname: '/search/[result]',
                query: { result: inputText }
              },
              '/result'
            )
          }
        >
          <AiOutlineSearch size={30} color={COLOR.GREY} />
        </SearchButton>
      </SearchInputWrapper>
      <div>
        {searchList.map((result) => (
          <SearchResult style={FONT.BODY1}>
            {result.name}
            <AiOutlineClose size={20} color={COLOR.GREY} />
          </SearchResult>
        ))}
      </div>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

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

const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
`;

export default Search;
