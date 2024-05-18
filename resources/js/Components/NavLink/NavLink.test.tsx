import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { NavLink } from './NavLink';

describe('NavLink', () => {
  it('should render link', () => {
    render(<NavLink>test</NavLink>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it("should accept inertiajs's Link props", () => {
    render(<NavLink href="/link">test</NavLink>);

    expect(screen.getByText('test')).toHaveAttribute('href', '/link');
  });

  it('should add additional css class', () => {
    render(
      <div>
        <NavLink>test1</NavLink>
        <NavLink className="m-5">test2</NavLink>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should change css when active', () => {
    render(
      <div>
        <NavLink>test1</NavLink>
        <NavLink active>test2</NavLink>
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass(
      'border-indigo-400 text-gray-900 focus:border-indigo-700',
    );
    expect(screen.getByText('test1')).toHaveClass(
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300',
    );

    expect(screen.getByText('test2')).not.toHaveClass(
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300',
    );
    expect(screen.getByText('test2')).toHaveClass(
      'border-indigo-400 text-gray-900 focus:border-indigo-700',
    );
  });
});
