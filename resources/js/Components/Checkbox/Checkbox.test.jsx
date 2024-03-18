import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('should render application logo', () => {
    render(<Checkbox value="test" />);

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('should accept input props', () => {
    render(
      <Checkbox placeholder="placeholder" value="value" autoComplete="false" />,
    );

    expect(screen.getByDisplayValue('value')).toBeInTheDocument();
    expect(screen.getByDisplayValue('value')).toHaveAttribute(
      'placeholder',
      'placeholder',
    );
    expect(screen.getByDisplayValue('value')).toHaveAttribute(
      'autoComplete',
      'false',
    );
  });

  it('should add additional css class', () => {
    render(
      <div>
        <Checkbox value="test1" />
        <Checkbox value="test2" className="m-5" />
      </div>,
    );

    expect(screen.getByDisplayValue('test1')).not.toHaveClass('m-5');
    expect(screen.getByDisplayValue('test2')).toHaveClass('m-5');
  });
});
