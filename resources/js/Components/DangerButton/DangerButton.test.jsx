import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { DangerButton } from './DangerButton';

describe('DangerButton', () => {
  it('should render button', () => {
    render(<DangerButton>test</DangerButton>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should accept button props', () => {
    render(<DangerButton type="submit">test</DangerButton>);

    expect(screen.getByText('test')).toHaveAttribute('type', 'submit');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <DangerButton>test1</DangerButton>
        <DangerButton className="m-5">test2</DangerButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should change opacity when disabled', () => {
    render(
      <div>
        <DangerButton>test1</DangerButton>
        <DangerButton disabled>test2</DangerButton>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('opacity-25');
    expect(screen.getByText('test2')).toHaveClass('opacity-25');
  });
});
