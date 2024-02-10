import { LinkButton, Search } from '@components';

type Props = {
  title: string;
  dataCount?: number;
  onSearch: (search: string) => void;
};

export const ListHeader = ({ dataCount = 0, onSearch, title }: Props) => {
  return (
    <div className="grid grid-cols-none 2xl:grid-cols-3 mb-12 gap-4 items-center">
      <div className="text-3xl justify-self-center 2xl:justify-self-start text-center">
        {title}({dataCount})
      </div>

      <div className="flex justify-center divide-x-2 divide-borderPrimary flex-wrap">
        <LinkButton text="All favorite" to="/" />
        <LinkButton text="My specialists" to="/my-specialists" />
      </div>

      <div className="justify-self-center 2xl:justify-self-end h-full 2xl:w-80 w-full">
        <Search onChange={onSearch} />
      </div>
    </div>
  );
};
