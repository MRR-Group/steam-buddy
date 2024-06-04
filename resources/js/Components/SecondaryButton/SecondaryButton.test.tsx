import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SecondaryButton } from './SecondaryButton';

describe('SecondaryButton', () => {
  it('should render button', () => {
    render(<SecondaryButton>test</SecondaryButton>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should change button type', () => {
    render(
      <div>
        <SecondaryButton>test1</SecondaryButton>
        <SecondaryButton type="submit">test2</SecondaryButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveAttribute('type', 'submit');
    expect(screen.getByText('test1')).toHaveAttribute('type', 'button');

    expect(screen.getByText('test2')).not.toHaveAttribute('type', 'button');
    expect(screen.getByText('test2')).toHaveAttribute('type', 'submit');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <SecondaryButton>test1</SecondaryButton>
        <SecondaryButton className="m-5">test2</SecondaryButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should change opacity when disabled', () => {
    render(
      <div>
        <SecondaryButton>test1</SecondaryButton>
        <SecondaryButton disabled>test2</SecondaryButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('opacity-25');
    expect(screen.getByText('test2')).toHaveClass('opacity-25');
  });

  it('should accept button props', () => {
    render(<SecondaryButton name="test-btn">test</SecondaryButton>);

    expect(screen.getByText('test')).toHaveAttribute('name', 'test-btn');
  });
});
