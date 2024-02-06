import { SearchIcon } from '@assets';
import { ChangeEvent } from 'react';

type Props = {
  onChange: (value: string) => void;
};

export const Search = ({ onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex relative">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2" />
      <input
        onChange={handleChange}
        className="py-4 pr-2 pl-8 focus:shadow-input outline-none w-80 h-full bg-transparent focus:bg-white"
        placeholder="Search..."
      />
    </div>
  );
};
