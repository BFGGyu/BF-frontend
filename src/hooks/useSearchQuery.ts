import { useQuery } from 'react-query';

import { getSearchResult } from '@apis/map';

export const useSearchQuery = (searchKeyword: string) => {
  const { data: searchList } = useQuery({
    queryKey: ['search', searchKeyword],
    queryFn: () => getSearchResult(searchKeyword),
    enabled: !!searchKeyword,
    staleTime: 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false
  });
  return searchList;
};
