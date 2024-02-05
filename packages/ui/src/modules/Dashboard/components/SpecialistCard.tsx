import { CalendarIcon, HeartIcon, MailIcon, MenuIcon, NotificationIcon } from '@assets';
import { Avatar, Button, IconButton, Rating } from '@components';
import { Specialist } from '@services/types';

const CardHeader = () => {
  return (
    <div className="flex justify-between pt-5 pr-5 pl-2 items-center">
      <div className="p-4 hover:bg-lightGrey cursor-pointer group rounded ">
        <MenuIcon className="fill-grey group-hover:fill-primary" />
      </div>

      <HeartIcon className="fill-grey hover:fill-primary cursor-pointer" />
    </div>
  );
};

const CardFooter = () => (
  <footer className="grid grid-cols-2 divide-x-2 divide-borderPrimary border-t-2 border-borderPrimary">
    <Button text="BOOK A VISIT" />
    <Button text="PROFILE" />
  </footer>
);

export const SpecialistCard = ({ firstName, lastName, specialization, avatar, userVote, votes }: Specialist) => {
  return (
    <div className="bg-white flex flex-col justify-center shadow-shd">
      <CardHeader />

      <div className="flex justify-center mb-6">
        <Avatar image={avatar} />
      </div>
      <div className="flex justify-center text-base">
        {firstName} {lastName}
      </div>
      <div className="flex justify-center text-center text-sm text-textSecondary mb-10">{specialization}</div>

      <div className="grid grid-cols-3 border-b-2 border-borderPrimary">
        <IconButton icon={<NotificationIcon />} />
        <IconButton icon={<CalendarIcon />} />
        <IconButton icon={<MailIcon />} />
      </div>

      <Rating onVote={() => {}} rating={userVote} votes={votes} />

      <CardFooter />
    </div>
  );
};
