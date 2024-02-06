import React from 'react';

type Props = {
  image: string;
};

export const Avatar = ({ image }: Props) => {
  return <img className="rounded-full w-[100px] min-h-[100px]" src={image} alt="avatar" />;
};
