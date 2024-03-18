import { act, render, screen } from '@testing-library/react';
import { expect, vitest } from 'vitest';

import React from 'react';
import { TextInput } from './TextInput';
import { InputLabel } from '../InputLabel/InputLabel';

describe('TextInput', () => {
  it('should render input', () => {
    render(<TextInput defaultValue="test" />);

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('should change input type', () => {
    render(
      <div>
        <TextInput defaultValue="test1" />
        <TextInput type="password" defaultValue="test2" />
      </div>,
    );

    expect(screen.getByDisplayValue('test1')).not.toHaveAttribute(
      'type',
      'password',
    );
    expect(screen.getByDisplayValue('test1')).toHaveAttribute('type', 'text');

    expect(screen.getByDisplayValue('test2')).not.toHaveAttribute(
      'type',
      'text',
    );
    expect(screen.getByDisplayValue('test2')).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('should add additional css class', () => {
    render(
      <div>
        <TextInput defaultValue="test1" />
        <TextInput defaultValue="test2" className="m-5" />
      </div>,
    );

    expect(screen.getByDisplayValue('test1')).not.toHaveClass('m-5');
    expect(screen.getByDisplayValue('test2')).toHaveClass('m-5');
  });

  it('should accept input props', () => {
    render(
      <div>
        <InputLabel htmlFor="input" value="label" />
        <TextInput id="input" name="input" defaultValue="test" />
      </div>,
    );

    expect(screen.getByDisplayValue('test')).toHaveAttribute('name', 'input');
  });

  it(`should be focused when the isFocused prop is active`, async () => {
    let isFocused = false;

    const { rerender } = render(
      <TextInput defaultValue="test" isFocused={isFocused} />,
    );

    expect(screen.getByDisplayValue('test')).not.equals(document.activeElement);

    act(() => {
      isFocused = true;
    });

    rerender(<TextInput defaultValue="test" isFocused={isFocused} />);

    expect(screen.getByDisplayValue('test')).equals(document.activeElement);
  });

  it(`should be focused via ref.focus when the isFocused prop is active and ref props is present`, async () => {
    const spy = vitest.fn();
    vitest.spyOn(React, 'createRef').mockReturnValueOnce({
      get current() {
        return { focus: spy };
      },

      set current(_) {},
    });

    const ref = React.createRef();
    let isFocused = false;

    const { rerender } = render(
      <TextInput defaultValue="test" isFocused={isFocused} ref={ref} />,
    );

    expect(spy).toHaveBeenCalledTimes(0);

    act(() => {
      isFocused = true;
    });

    rerender(<TextInput defaultValue="test" isFocused={isFocused} ref={ref} />);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
