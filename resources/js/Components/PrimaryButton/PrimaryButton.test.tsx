import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PrimaryButton } from './PrimaryButton';

describe('PrimaryButton', () => {
  it('should render button', () => {
    render(<PrimaryButton>test</PrimaryButton>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should accept button props', () => {
    render(<PrimaryButton type="submit">test</PrimaryButton>);

    expect(screen.getByText('test')).toHaveAttribute('type', 'submit');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <PrimaryButton>test1</PrimaryButton>
        <PrimaryButton className="m-5">test2</PrimaryButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should change opacity when disabled', () => {
    render(
      <div>
        <PrimaryButton>test1</PrimaryButton>
        <PrimaryButton disabled>test2</PrimaryButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('opacity-25');
    expect(screen.getByText('test2')).toHaveClass('opacity-25');
  });
});
