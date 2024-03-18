import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { InputError } from './InputError';

describe('InputError', () => {
  it('should render error message', () => {
    render(<InputError message="test" />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should add additional css class', () => {
    render(
      <div>
        <InputError message="test1" />
        <InputError message="test2" className="m-5" />
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should accept p props', () => {
    render(<InputError style={{ color: 'red' }} message="value" />);

    expect(screen.getByText('value')).toHaveAttribute('style', 'color: red;');
  });
});
