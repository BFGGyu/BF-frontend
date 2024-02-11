import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getSearchResult } from '@apis/map';
import SearchBar from '@common/SearchBar';
import AfterSearchSection from '@search/AfterSearchSection';
import BeforeSearchSection from '@search/BeforeSearchSection';
import { IFacilityMarker } from 'types/map';

const SearchPage = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchList, setSearchList] = useState<IFacilityMarker>({} as IFacilityMarker);

  useEffect(() => {
    const result = router.query.result;
    if (typeof result === 'string') {
      setIsSearched(true);
      getSearchResult(result).then((data) => {
        if (data !== undefined) setSearchList(data);
      });
      setKeyword(result);
    }
  }, [router.query.result]);

  return (
    <SearchWrapper>
      <SearchBar keyword={keyword} setIsSearched={setIsSearched} />
      {isSearched ? (
        <AfterSearchSection searchList={searchList} setSearchList={setSearchList} />
      ) : (
        <BeforeSearchSection />
      )}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export default SearchPage;
