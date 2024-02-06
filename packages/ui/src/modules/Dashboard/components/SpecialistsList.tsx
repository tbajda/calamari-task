import { SpecialistCard } from './SpecialistCard';
import { Specialist } from 'specialist-types';

type Props = {
  data?: Specialist[];
  isLoading: boolean;
};

export const SpecialistsList = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (!data) {
    return <div className="flex justify-center items-center">No data :(</div>;
  }

  return (
    <div className="grid grid-cols-auto-fill-280 gap-8 justify-center items-center">
      {data?.map((specialists) => <SpecialistCard key={specialists.id} {...specialists} />)}
    </div>
  );
};
