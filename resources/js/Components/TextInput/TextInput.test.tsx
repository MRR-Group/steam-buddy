import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { TextInput } from './TextInput';

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

    expect(screen.getByDisplayValue('test1').parentNode).not.toHaveClass('m-5');
    expect(screen.getByDisplayValue('test2').parentNode).toHaveClass('m-5');
  });

  it('should accept input props', () => {
    render(<TextInput autoComplete="auto-test" defaultValue="test" />);

    expect(screen.getByDisplayValue('test')).toHaveAttribute(
      'autoComplete',
      'auto-test',
    );
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
    const createRef = vitest.fn(
      () =>
        new (class {
          get current() {
            return { focus: spy };
          }

          set current(_) {}
        })(),
    ) as unknown as () => React.RefObject<HTMLInputElement>;

    const ref = createRef();
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

  it(`should render label`, () => {
    render(<TextInput name="input" label="Input" defaultValue="value" />);

    expect(screen.getByDisplayValue('value')).toHaveAttribute('id', 'input');
    expect(screen.getByText('Input')).toHaveAttribute('for', 'input');
  });

  it(`should make label bigger if value is empty`, () => {
    render(<TextInput name="input" label="Input" value="" />);

    expect(screen.getByText('Input')).toHaveClass('top-3 text-xl');
  });

  it(`should make label smaller if input contains value`, () => {
    render(<TextInput name="input" label="Input" value="text" />);

    expect(screen.getByText('Input')).toHaveClass('top-0 text-sm');
  });
});
