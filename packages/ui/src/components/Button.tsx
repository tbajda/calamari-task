type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({ text, onClick, disabled }: Props) => {
  return (
    <button
      className="p-6 text-xs text-textSecondary transition hover:bg-primary hover:text-white hover:font-semibold disabled:pointer-events-none"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
