import SearchBar from '@/components/common/SearchBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SearchResultIndex = () => {
  const router = useRouter();

  const [searchResult, setSearchResult] = useState<string>('');

  useEffect(() => {
    if (typeof router.query.result === 'string') setSearchResult(router.query.result);
  });
  return (
    <>
      <SearchBar text={router.query.result} />
    </>
  );
};

export default SearchResultIndex;
