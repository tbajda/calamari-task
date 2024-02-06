import { NavLink } from 'react-router-dom';

type Props = {
  text: string;
  to: string;
};

export const LinkButton = ({ text, to }: Props) => {
  return (
    <NavLink
      className={({
        isActive,
      }) => `text-center py-4 text-sm text-textSecondary hover:bg-primary hover:text-white border-2
      hover:font-semibold border-borderPrimary w-52
            ${isActive ? 'bg-primary text-white font-semibold' : 'bg-none'}`}
      to={to}
    >
      {text}
    </NavLink>
  );
};
