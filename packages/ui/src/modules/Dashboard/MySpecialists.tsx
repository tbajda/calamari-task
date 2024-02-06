import { ListHeader } from './components/ListHeader';
import { SpecialistsList } from './components/SpecialistsList';
import { useGetSpecialistsQuery } from '@services';

export const MySpecialists = () => {
  const { data, isLoading } = useGetSpecialistsQuery(null);

  return (
    <>
      <ListHeader dataCount={data?.length} />
      <SpecialistsList data={data} isLoading={isLoading} />
    </>
  );
};
