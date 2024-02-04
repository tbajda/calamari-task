import { useGetSpecialistsQuery } from '../../../services/specialists';
import { SpecialistCard } from './SpecialistCard';

export const SpecialistsList = () => {
  const { data, error, isLoading } = useGetSpecialistsQuery(null);

  return (
    <div className=" grid grid-cols-auto-fill-250 gap-8 px-72 justify-center items-center">
      {data?.map((specialists) => <SpecialistCard key={specialists.id} {...specialists} />)}
    </div>
  );
};
