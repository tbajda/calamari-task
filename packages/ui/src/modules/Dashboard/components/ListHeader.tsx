import { LinkButton, Search } from '@components';

type Props = {
  dataCount?: number;
};

export const ListHeader = ({ dataCount = 0 }: Props) => {
  return (
    <div className="grid grid-cols-3 mb-12 content-center">
      <div className="text-3xl">Favorite specialists({dataCount})</div>

      <div className="flex justify-center divide-x-2 divide-borderPrimary">
        <LinkButton text="All favorite" to="/" />
        <LinkButton text="My specialists" to="/my-specialists" />
      </div>

      <div className="justify-self-end h-full">
        <Search onChange={() => {}} />
      </div>
    </div>
  );
};
