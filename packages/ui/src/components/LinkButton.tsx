import { NavLink } from 'react-router-dom';

type Props = {
  text: string;
  to: string;
};

export const LinkButton = ({ text, to }: Props) => {
  return (
    <NavLink
      className={({ isActive }) => `text-center py-4 text-sm text-textSecondary  border-2 border-borderPrimary w-52
            ${isActive ? 'bg-primary text-white font-semibold hover:text-white' : 'bg-none hover:text-primary'}`}
      to={to}
    >
      {text}
    </NavLink>
  );
};
