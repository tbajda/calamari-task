import { StarIcon } from '@assets';
import { useMemo, useState } from 'react';

type Props = {
  rating: number;
  votes: number[];
  onVote: (vote: number) => void;
};

const stars = [...Array(5).keys()];

export const Rating = ({ rating, votes, onVote }: Props) => {
  const [hover, setHover] = useState<number>(0);

  const totalVotes = votes.length;

  const averageRating = useMemo(
    () => (votes.reduce((acc, v) => acc + v, 0) / votes.length).toFixed(1).replace('.', ','),
    [votes],
  );

  return (
    <div className="gap-2 py-5 px-8 flex justify-between items-center">
      <div className="flex">
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

      <div className="text-center">
        <div className="text-3xl font-semibold mb-1">{averageRating}</div>
        <div className="text-textSecondary text-xs">({totalVotes})</div>
      </div>
    </div>
  );
};
