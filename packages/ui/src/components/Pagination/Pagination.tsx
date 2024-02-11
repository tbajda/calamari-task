import { Button } from '@components';

type Props = {
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages = 0, onPageChange }: Props) => {
  if (totalPages === 0) {
    return null;
  }

  return (
    <div data-testid="pagination" className="flex justify-center lg:justify-end items-center gap-2 mt-8 flex-wrap ">
      Page: {page} of {totalPages}
      <div className="grid grid-cols-2 w-52">
        <Button text="Prev" disabled={page === 1 || totalPages === 0} onClick={() => onPageChange(page - 1)} />
        <Button text="Next" disabled={page === totalPages || totalPages === 0} onClick={() => onPageChange(page + 1)} />
      </div>
    </div>
  );
};
