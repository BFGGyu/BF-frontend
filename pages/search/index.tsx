import SearchBar from '@/components/common/SearchBar';
import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

const Search = () => {
  const [searchList, setSearchList] = useState([
    { id: '0', name: '국립 고궁 박물관' },
    { id: '1', name: '국립 현대 미술관' },
    { id: '2', name: '진격의 거인전' }
  ]);

  return (
    <SearchWrapper>
      <SearchBar />
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

const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
`;

export default Search;
