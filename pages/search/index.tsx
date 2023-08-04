import COLOR from '@/constants/colors';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';

const Search = () => {
  return (
    <SearchWrapper>
      <SearchInputWrapper>
        <div style={{ display: 'flex', gap: 10 }}>
          <BsArrowLeft color={COLOR.GREY} size={25} />
          <SearchInput placeholder='검색어를 입력하세요.' />
        </div>
        <AiOutlineSearch size={30} />
      </SearchInputWrapper>
      <div>
        <SearchResult>
          최근 검색어 내역
          <AiOutlineClose size={20} />
        </SearchResult>
        <SearchResult>최근 검색어 내역</SearchResult>
        <SearchResult>최근 검색어 내역</SearchResult>
      </div>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // height: 100%;
  border: 1px solid black;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  border: 3px solid black;
  padding: 10px;
`;

const SearchInput = styled.input`
  border: 0;
  font-size: 16px;
  &::placeholder {
    color: ${COLOR.GREY};
  }
`;

const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  // border: 1px solid black;
`;

export default Search;
