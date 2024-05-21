import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SmallButton } from './SmallButton';

describe('SmallButton', () => {
  it('should render button', () => {
    render(<SmallButton>test</SmallButton>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should accept button props', () => {
    render(<SmallButton type="submit">test</SmallButton>);

    expect(screen.getByText('test')).toHaveAttribute('type', 'submit');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <SmallButton>test1</SmallButton>
        <SmallButton className="m-5">test2</SmallButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should change opacity when disabled', () => {
    render(
      <div>
        <SmallButton>test1</SmallButton>
        <SmallButton disabled>test2</SmallButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('opacity-25');
    expect(screen.getByText('test2')).toHaveClass('opacity-25');
  });
});
