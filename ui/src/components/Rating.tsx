import { StarIcon } from '@assets';
import { useState } from 'react';

type Props = {
  rating: number;
  average?: number;
  totalVotes?: number;
  onVote: (vote: number) => void;
};

const stars = [...Array(5).keys()];

export const Rating = ({ rating, average, totalVotes, onVote }: Props) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="flex gap-2 p-8">
      {stars.map((star) => (
        <StarIcon
          style={{
            fill: star + 1 <= (hover || rating) ? '#00E3EE' : '#C5CDDA',
          }}
          key={star}
          className="fill-grey cursor-pointer"
          onMouseEnter={() => setHover(star + 1)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onVote(star + 1)}
        />
      ))}
    </div>
  );
};
