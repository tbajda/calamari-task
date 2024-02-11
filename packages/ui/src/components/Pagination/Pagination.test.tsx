import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('should return null when there are no pages to display', () => {
    const onChange = jest.fn();

    render(<Pagination onPageChange={onChange} page={1} />);

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('should display current page', () => {
    const onChange = jest.fn();

    render(<Pagination onPageChange={onChange} page={1} totalPages={20} />);

    expect(screen.queryByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Page: 1 of 20')).toBeInTheDocument();
  });

  it('should fire next page change', () => {
    const onChange = jest.fn();

    render(<Pagination onPageChange={onChange} page={1} totalPages={20} />);

    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should fire prev page change', () => {
    const onChange = jest.fn();

    render(<Pagination onPageChange={onChange} page={2} totalPages={20} />);

    const nextButton = screen.getByText('Prev');

    fireEvent.click(nextButton);

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should not call page change on prev click', () => {
    const onChange = jest.fn();

    render(<Pagination onPageChange={onChange} page={1} totalPages={20} />);

    const button = screen.getByText('Prev');

    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not call page change on next click when it is a last page', () => {
    const onChange = jest.fn();

    render(<Pagination onPageChange={onChange} page={20} totalPages={20} />);

    const button = screen.getByText('Next');

    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });
});
