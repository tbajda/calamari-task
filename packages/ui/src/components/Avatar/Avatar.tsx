type Props = {
  image?: string;
  firstName: string;
  lastName: string;
};

const colors = ['bg-tertiaryLight text-tertiary', 'bg-primaryLight text-primary'];

const DefaultAvatar = ({ firstName, lastName }: Omit<Props, 'image'>) => {
  const randomColor = colors[Math.floor((firstName.charCodeAt(0) / 150) * colors.length)];

  return (
    <div
      className={'w-[100px] min-h-[100px] rounded-full flex justify-center items-center text-xl' + ' ' + randomColor}
      data-testid="default-avatar"
    >
      {firstName[0].toUpperCase()}
      {lastName[0].toUpperCase()}
    </div>
  );
};

export const Avatar = (props: Props) => {
  const { image, ...names } = props;

  if (!image) {
    return <DefaultAvatar {...names} />;
  }

  return <img data-testid="avatar" className="rounded-full w-[100px] min-h-[100px]" src={image} alt="avatar" />;
};
