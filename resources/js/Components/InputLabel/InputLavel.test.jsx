import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { InputLabel } from './InputLabel';

describe('InputError', () => {
  it('should render', () => {
    render(<InputLabel>test</InputLabel>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render value text instead of children if value props is defined', () => {
    render(<InputLabel value="visible">hidden</InputLabel>);

    expect(screen.queryByText('hidden')).not.toBeInTheDocument();
    expect(screen.queryByText('visible')).toBeInTheDocument();
  });

  it('should add additional css class', () => {
    render(
      <div>
        <InputLabel value="test1" />
        <InputLabel value="test2" className="m-5" />
      </div>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should accept label props', () => {
    render(
      <div>
        <InputLabel htmlFor="input" value="value" />
        <input id="input" />
      </div>,
    );

    expect(screen.getByText('value')).toHaveAttribute('for', 'input');
  });
});
