import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TagButton } from './TagButton';

describe('TagButton', () => {
  it('should render button', () => {
    render(<TagButton>test</TagButton>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should accept button props', () => {
    render(
      <div>
        <TagButton type="submit">test1</TagButton>
        <TagButton type="submit" active>test2</TagButton>
      </div>
    );

    expect(screen.getByText('test1').parentElement).toHaveAttribute('type', 'submit');
    expect(screen.getByText('test2').parentElement).toHaveAttribute('type', 'submit');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <TagButton>test1</TagButton>
        <TagButton active className="m-5">test2</TagButton>
      </div>,
    );

    expect(screen.getByText('test1').parentElement).not.toHaveClass('m-5');
    expect(screen.getByText('test2').parentElement).toHaveClass('m-5');
  });

  it('should change font color when inactive', () => {
    render(
      <div>
        <TagButton active>test1</TagButton>
        <TagButton>test2</TagButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('text-secondary-500');
    expect(screen.getByText('test2')).toHaveClass('text-secondary-500');
  });
});
