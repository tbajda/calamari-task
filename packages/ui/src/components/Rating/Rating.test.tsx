import { fireEvent, render, screen } from '@testing-library/react';
import { Props, Rating } from './Rating';

jest.mock('@assets', () => ({
  StarIcon: (props: Props) => <div {...props}>StarIcon</div>,
}));

describe('Rating', () => {
  it('should calculate votes average', () => {
    render(<Rating rating={0} votes={[1, 2, 3, 4, 5]} onVote={jest.fn()} />);

    expect(screen.getByText('3,0')).toBeInTheDocument();
  });

  it('should display user current vote', () => {
    render(<Rating rating={0} votes={[1, 2, 3, 4, 5]} onVote={jest.fn()} />);

    const stars = screen.getAllByText('StarIcon');

    stars.forEach((star) => {
      expect(star).toHaveClass('fill-grey');
    });
  });
  it('should all stars be highlighted', () => {
    render(<Rating rating={5} votes={[1, 2, 3, 4, 5]} onVote={jest.fn()} />);

    const stars = screen.getAllByText('StarIcon');

    stars.forEach((star) => {
      expect(star).toHaveClass('fill-secondary');
    });
  });

  it('should first 3 stars be highlighted', () => {
    render(<Rating rating={3} votes={[1, 2, 3, 4, 5]} onVote={jest.fn()} />);

    const stars = screen.getAllByText('StarIcon');

    stars.forEach((star, index) => {
      if (index > 2) {
        expect(star).toHaveClass('fill-grey');
      } else {
        expect(star).toHaveClass('fill-secondary');
      }
    });
  });

  it('should first 3 stars be highlighted on hover', () => {
    render(<Rating rating={0} votes={[1, 2, 3, 4, 5]} onVote={jest.fn()} />);

    const star = screen.getByTestId('star-3');
    const stars = screen.getAllByText('StarIcon');

    fireEvent.mouseEnter(star);

    stars.forEach((star, index) => {
      if (index > 2) {
        expect(star).toHaveClass('fill-grey');
      } else {
        expect(star).toHaveClass('fill-secondary');
      }
    });
  });
});
