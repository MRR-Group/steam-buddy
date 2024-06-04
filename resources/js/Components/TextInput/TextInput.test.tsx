import { render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { TextInput } from './TextInput';
import { act } from 'react';

describe('TextInput', () => {
  it('should render input', () => {
    render(<TextInput value="test" onChange={() => {}} />);

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('should change input type', () => {
    render(
      <div>
        <TextInput value="test1" onChange={() => {}} />
        <TextInput type="password" value="test2" onChange={() => {}} />
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
        <TextInput value="test1" onChange={() => {}} />
        <TextInput value="test2" onChange={() => {}} className="m-5" />
      </div>,
    );

    expect(screen.getByDisplayValue('test1').parentNode).not.toHaveClass('m-5');
    expect(screen.getByDisplayValue('test2').parentNode).toHaveClass('m-5');
  });

  it('should accept input props', () => {
    render(<TextInput autoComplete="auto-test" value="test" onChange={() => {}} />);

    expect(screen.getByDisplayValue('test')).toHaveAttribute(
      'autoComplete',
      'auto-test',
    );
  });

  it(`should be focused when the isFocused prop is active`, async () => {
    let isFocused = false;

    const { rerender } = render(
      <TextInput value="test" onChange={() => {}} isFocused={isFocused} />,
    );

    expect(screen.getByDisplayValue('test')).not.equals(document.activeElement);

    act(() => {
      isFocused = true;
    });

    rerender(<TextInput value="test" onChange={() => {}} isFocused={isFocused} />);

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
      <TextInput value="test" onChange={() => {}} isFocused={isFocused} ref={ref} />,
    );

    expect(spy).toHaveBeenCalledTimes(0);

    act(() => {
      isFocused = true;
    });

    rerender(<TextInput value="test" onChange={() => {}} isFocused={isFocused} ref={ref} />);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should render label`, () => {
    render(<TextInput name="input" label="Input" value="value" onChange={() => {}} />);

    expect(screen.getByDisplayValue('value')).toHaveAttribute('id', 'input');
    expect(screen.getByText('Input')).toHaveAttribute('for', 'input');
  });

  it(`should make label bigger if value is empty`, () => {
    render(<TextInput name="input" label="Input" value="" onChange={() => {}} />);

    expect(screen.getByText('Input')).toHaveClass('top-3 text-xl');
  });

  it(`should make label smaller if input contains value`, () => {
    render(<TextInput name="input" label="Input" value="text" onChange={() => {}} />);

    expect(screen.getByText('Input')).toHaveClass('top-0 text-sm');
  });
});
