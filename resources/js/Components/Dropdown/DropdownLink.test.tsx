import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DropdownLink } from './DropdownLink';

describe('DropdownLink', () => {
  it('should render link', () => {
    render(<DropdownLink>test</DropdownLink>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it("should accept inertiajs's Link props", () => {
    render(<DropdownLink as="div">test</DropdownLink>);

    expect(screen.getByText('test').tagName).toBe("DIV");
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
