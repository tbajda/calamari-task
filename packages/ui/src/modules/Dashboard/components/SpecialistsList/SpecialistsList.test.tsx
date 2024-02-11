import { render, screen } from '@testing-library/react';
import { SpecialistsList } from './SpecialistsList';

jest.mock('../SpecialistCard', () => ({
  SpecialistCard: () => <div>SpecialistCard</div>,
}));

const mockData = [
  {
    id: 'string',
    firstName: 'FirstName',
    lastName: 'string',
    avatar: 'string',
    specialization: 'string',
    votes: [],
    userVote: 0,
    isFavorite: false,
  },
  {
    id: 'string2',
    firstName: 'FirstName',
    lastName: 'string',
    avatar: 'string',
    specialization: 'string',
    votes: [],
    userVote: 0,
    isFavorite: false,
  },
];

describe('SpecialistsList', () => {
  it('should show loader', () => {
    render(<SpecialistsList isLoading={true} />);

    expect(screen.getByText('Loading...'));
  });

  it('should show empty message', () => {
    render(<SpecialistsList isLoading={false} />);

    expect(screen.getByText('No data :('));
  });

  it('should show list of data', () => {
    render(<SpecialistsList isLoading={false} data={mockData} />);

    expect(screen.getAllByText('SpecialistCard')).toHaveLength(2);
  });
});
