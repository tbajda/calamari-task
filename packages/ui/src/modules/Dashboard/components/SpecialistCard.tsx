import { CalendarIcon, HeartIcon, MailIcon, MenuIcon, NotificationIcon } from '@assets';
import { Avatar, Button, IconButton, Rating } from '@components';
import { useAddToFavoriteMutation, useRemoveFromFavoritesMutation, useVoteMutation } from '@services';
import { Specialist } from 'specialist-types';

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

type Props = {
  specialist: Specialist;
};

export const SpecialistCard = ({ specialist }: Props) => {
  const { id, firstName, lastName, specialization, avatar, userVote, votes, isFavorite } = specialist;

  const [addToFavorite] = useAddToFavoriteMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const [rateSpecialist] = useVoteMutation();

  const onHeartClick = () => {
    isFavorite ? removeFromFavorites(id) : addToFavorite(id);
  };

  const onVote = (vote: number) => {
    rateSpecialist({ id, vote });
  };

  return (
    <div className="bg-white flex flex-col justify-center shadow-shd">
      <div className="flex justify-between pt-5 pr-5 pl-2 items-center">
        <div className="p-4 hover:bg-lightGrey cursor-pointer group rounded ">
          <MenuIcon className="fill-grey group-hover:fill-primary" />
        </div>

        <HeartIcon
          className={`hover:fill-primary cursor-pointer ${isFavorite ? 'fill-primary' : 'fill-grey'}`}
          onClick={onHeartClick}
        />
      </div>

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

      <Rating onVote={onVote} rating={userVote} votes={votes} />

      <footer className="grid grid-cols-2 divide-x-2 divide-borderPrimary border-t-2 border-borderPrimary">
        <Button text="BOOK A VISIT" />
        <Button text="PROFILE" />
      </footer>
    </div>
  );
};
