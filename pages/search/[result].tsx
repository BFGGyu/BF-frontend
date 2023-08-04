import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SearchResultIndex = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.result);
  });
  return <div>{'' || router.query.result}</div>;
};

export default SearchResultIndex;
