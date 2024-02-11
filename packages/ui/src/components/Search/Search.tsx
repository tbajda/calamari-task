import { SearchIcon } from '@assets';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  onChange: (value: string) => void;
};

export const Search = ({ onChange }: Props) => {
  const debouncedChange = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, 300);

  return (
    <div className="flex relative">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2" />
      <input
        data-testid="search"
        onChange={debouncedChange}
        className="py-4 pr-2 pl-8 focus:shadow-input outline-none h-full bg-transparent focus:bg-white w-full"
        placeholder="Search..."
      />
    </div>
  );
};
