import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { ResponsiveNavLink } from './ResponsiveNavLink';

describe('ResponsiveNavLink', () => {
  it('should render link', () => {
    render(<ResponsiveNavLink>test</ResponsiveNavLink>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it("should accept inertiajs's Link props", () => {
    render(<ResponsiveNavLink href="/link">test</ResponsiveNavLink>);

    expect(screen.getByText('test')).toHaveAttribute('href', '/link');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <ResponsiveNavLink>test1</ResponsiveNavLink>
        <ResponsiveNavLink className="m-5">test2</ResponsiveNavLink>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should change css when active', () => {
    render(
      <div>
        <ResponsiveNavLink>test1</ResponsiveNavLink>
        <ResponsiveNavLink active>test2</ResponsiveNavLink>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass(
      'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700',
    );
    expect(screen.getByText('test1')).toHaveClass(
      'border-transparent text-text hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300',
    );

    expect(screen.getByText('test2')).not.toHaveClass(
      'border-transparent text-text hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300',
    );
    expect(screen.getByText('test2')).toHaveClass(
      'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700',
    );
  });
});
