import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const useQueryString = () => {
  const router = useRouter();
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const query = decodeURIComponent(router.asPath.split('=')[1]);
    setResult(query);
  }, [router]);

  return result;
};

export default useQueryString;
