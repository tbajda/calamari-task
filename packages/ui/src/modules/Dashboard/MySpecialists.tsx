import { Pagination } from '@components';
import { useFilters } from '@hooks';
import { useGetFavoritesQuery } from '@services';
import { ListHeader } from './components/ListHeader';
import { SpecialistsList } from './components/SpecialistsList/SpecialistsList';

export const MySpecialists = () => {
  const { search, page, onSearch, onPageChange } = useFilters();

  const { data, isLoading } = useGetFavoritesQuery({
    search,
    page,
  });

  return (
    <>
      <ListHeader dataCount={data?.total} onSearch={onSearch} title={'My specialists'} />
      <SpecialistsList data={data?.response} isLoading={isLoading} />
      <Pagination page={page} totalPages={data?.totalPages} onPageChange={onPageChange} />
    </>
  );
};
