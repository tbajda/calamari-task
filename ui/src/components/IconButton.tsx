import { ReactElement, cloneElement } from 'react';

type Props = {
  onClick?: () => void;
  icon: ReactElement;
};
export const IconButton = ({ onClick, icon }: Props) => {
  return (
    <button
      className="p-2 flex items-center justify-center border-b-4 border-transparent hover:border-primary group hover:text-white hover:font-semibold"
      onClick={onClick}
    >
      {cloneElement(icon, { className: 'group-hover:fill-primary fill-grey' })}
    </button>
  );
};
