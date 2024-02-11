import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Search } from './Search';

jest.mock('@assets', () => ({
  SearchIcon: () => 'SearchIcon',
}));

describe('Search', () => {
  it('should call on change', async () => {
    const onChange = jest.fn();

    render(<Search onChange={onChange} />);

    const input = screen.getByTestId('search');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });
});
