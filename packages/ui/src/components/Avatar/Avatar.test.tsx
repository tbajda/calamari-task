import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('should show avatar when image is available', () => {
    render(<Avatar image="test" firstName="Foo" lastName="Bar" />);

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('should show default avatar when image is not available', () => {
    render(<Avatar firstName="Foo" lastName="Bar" />);

    expect(screen.getByTestId('default-avatar')).toBeInTheDocument();
  });
});
