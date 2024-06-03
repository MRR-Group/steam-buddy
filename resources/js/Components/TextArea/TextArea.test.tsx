import { render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { TextArea } from './TextArea';
import { act } from 'react';

describe('TextArea', () => {
  it('should render textarea', () => {
    render(<TextArea value="test" onChange={() => {}} />);

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('should add additional css class', () => {
    render(
      <div>
        <TextArea value="test1" onChange={() => {}} />
        <TextArea value="test2" onChange={() => {}} className="m-5" areaClassName="m-10" />
      </div>,
    );

    expect(screen.getByDisplayValue('test1').parentNode).not.toHaveClass('m-5');
    expect(screen.getByDisplayValue('test2').parentNode).toHaveClass('m-5');
    expect(screen.getByDisplayValue('test1')).not.toHaveClass('m-10');
    expect(screen.getByDisplayValue('test2')).toHaveClass('m-10');
  });

  it('should accept aria props', () => {
    render(<TextArea autoComplete="auto-test" value="test" onChange={() => {}} />);

    expect(screen.getByDisplayValue('test')).toHaveAttribute(
      'autoComplete',
      'auto-test',
    );
  });

  it(`should be focused when the isFocused prop is active`, async () => {
    let isFocused = false;

    const { rerender } = render(
      <TextArea value="test" onChange={() => {}} isFocused={isFocused} />,
    );

    expect(screen.getByDisplayValue('test')).not.equals(document.activeElement);

    act(() => {
      isFocused = true;
    });

    rerender(<TextArea value="test" onChange={() => {}} isFocused={isFocused} />);

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
    ) as unknown as () => React.RefObject<HTMLTextAreaElement>;

    const ref = createRef();
    let isFocused = false;

    const { rerender } = render(
      <TextArea value="test" onChange={() => {}} isFocused={isFocused} ref={ref} />,
    );

    expect(spy).toHaveBeenCalledTimes(0);

    act(() => {
      isFocused = true;
    });

    rerender(<TextArea value="test" onChange={() => {}} isFocused={isFocused} ref={ref} />);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should render label`, () => {
    render(<TextArea name="text-area" label="TextArea" value="value" onChange={() => {}} />);

    expect(screen.getByDisplayValue('value')).toHaveAttribute('id', 'text-area');
    expect(screen.getByText('TextArea')).toHaveAttribute('for', 'text-area');
  });

  it(`should make label bigger if value is empty`, () => {
    render(<TextArea name="text-area" label="TextArea" value="" onChange={() => {}} />);

    expect(screen.getByText('TextArea')).toHaveClass('top-[calc(100%-2.4rem)] text-xl');
  });

  it(`should make label smaller if area contains value`, () => {
    render(<TextArea name="text-area" label="TextArea" value="text" onChange={() => {}} />);

    expect(screen.getByText('TextArea')).toHaveClass('top-0 text-sm');
  });
});
