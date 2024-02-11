import { Pagination } from '@components';
import { useFilters } from '@hooks';
import { useGetSpecialistsQuery } from '@services';
import { ListHeader } from './components/ListHeader';
import { SpecialistsList } from './components/SpecialistsList/SpecialistsList';

export const AllFavorites = () => {
  const { search, page, onSearch, onPageChange } = useFilters();

  const { data, isLoading } = useGetSpecialistsQuery({
    search,
    page,
  });

  return (
    <>
      <ListHeader dataCount={data?.total} onSearch={onSearch} title={'Favorite specialists'} />
      <SpecialistsList data={data?.response} isLoading={isLoading} />
      <Pagination page={page} totalPages={data?.totalPages} onPageChange={onPageChange} />
    </>
  );
};
