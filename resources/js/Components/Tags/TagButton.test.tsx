import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TagButton } from './TagButton';

describe('TagButton', () => {
  it('should render button', () => {
    render(<TagButton label='test btn'>test</TagButton>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should contains aria role and label', () => {
    render(<TagButton label='test label' role="button">test</TagButton>);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('test label')).toBeInTheDocument();
  })

  it('should add additional css class', () => {
    render(
      <div>
        <TagButton label='test btn'>test1</TagButton>
        <TagButton label='test btn' active className="m-5">test2</TagButton>
      </div>,
    );

    expect(screen.getByText('test1').parentElement).not.toHaveClass('m-5');
    expect(screen.getByText('test2').parentElement).toHaveClass('m-5');
  });

  it('should change font color when inactive', () => {
    render(
      <div>
        <TagButton label='test btn' active>test1</TagButton>
        <TagButton label='test btn'>test2</TagButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('text-secondary-300');
    expect(screen.getByText('test2')).toHaveClass('text-secondary-300');
  });

  it('should set aria-checked to true when active', () => {
    render(
      <div>
        <TagButton label='test btn' active>test1</TagButton>
        <TagButton label='test btn'>test2</TagButton>
      </div>,
    );

    expect(screen.getByText('test1')).toHaveAttribute('aria-checked', "true");
    expect(screen.getByText('test2')).toHaveAttribute('aria-checked', "false");
  });
});
