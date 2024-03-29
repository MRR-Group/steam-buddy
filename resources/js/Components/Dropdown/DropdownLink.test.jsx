import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { DropdownLink } from './DropdownLink';

describe('DropdownLink', () => {
  it('should render link', () => {
    render(<DropdownLink>test</DropdownLink>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it("should accept inertiajs's Link props", () => {
    render(<DropdownLink href="/link">test</DropdownLink>);

    expect(screen.getByText('test')).toHaveAttribute('href', '/link');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <DropdownLink>test1</DropdownLink>
        <DropdownLink className="m-5">test2</DropdownLink>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });
});
