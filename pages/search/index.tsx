import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import SearchBar from '@common/SearchBar';
import AfterSearchSection from '@search/AfterSearchSection';
import BeforeSearchSection from '@search/BeforeSearchSection';

const SearchPage = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const result = router.query.result;
    if (typeof result === 'string') {
      setKeyword(result);
    }
  }, [router.query.result]);

  return (
    <SearchWrapper>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      {keyword ? <AfterSearchSection keyword={keyword} /> : <BeforeSearchSection />}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export default SearchPage;
