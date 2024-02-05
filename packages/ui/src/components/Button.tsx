type Props = {
  text: string;
  onClick?: () => void;
};

export const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className="p-6 text-xs text-textSecondary hover:bg-primary hover:text-white hover:font-semibold"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
