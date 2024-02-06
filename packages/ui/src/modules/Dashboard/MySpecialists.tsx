import { ListHeader } from './components/ListHeader';
import { SpecialistsList } from './components/SpecialistsList';
import { useGetFavoritesQuery } from '@services';

export const MySpecialists = () => {
  const { data, isLoading } = useGetFavoritesQuery(null);

  return (
    <>
      <ListHeader dataCount={data?.length} />
      <SpecialistsList data={data} isLoading={isLoading} />
    </>
  );
};
