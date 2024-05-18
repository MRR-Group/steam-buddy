import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Notification } from './Notification';

describe('Notification', () => {
  it('should be hidden if message is null', () => {
    render(<Notification message={null} />);

    expect(screen.getByRole('button').parentNode.parentNode).toHaveClass(
      'opacity-0',
    );
  });

  it('should render message', () => {
    render(<Notification message={'test'} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('test').parentElement).toHaveClass('opacity-100');
  });

  it('should hide when user click on close icon', () => {
    render(<Notification message={'test'} />);

    expect(screen.getByText('test').parentElement).toHaveClass('opacity-100');

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('test').parentElement).toHaveClass('opacity-0');
  });

  it('should reshow if received another message', () => {
    const { rerender } = render(<Notification message={'test'} />);

    expect(screen.getByText('test').parentElement).toHaveClass('opacity-100');

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('test').parentElement).toHaveClass('opacity-0');

    rerender(<Notification message={'new test'} />);

    expect(screen.getByText('new test').parentElement).toHaveClass(
      'opacity-100',
    );
  });
});
