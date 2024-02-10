import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1');

  const onSearch = (value: string) => {
    setSearchParams({ page: '1', search: value });
  };

  const onPageChange = (value: number) => {
    setSearchParams({ page: value.toString(), search });
  };

  return {
    search,
    page,
    onSearch,
    onPageChange,
  };
};
