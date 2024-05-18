import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { Trigger } from './Trigger';
import { DropDownContext } from './Context';

const context = (value: boolean) => ({
  open: value,
  setOpen: () => {},
  toggleOpen: () => {},
});

describe('Trigger', () => {
  it('should render', () => {
    render(
      <DropDownContext.Provider value={context(true)}>
        <Trigger>test</Trigger>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it(`Shouldn't display a full-screen div when context.open is false`, () => {
    const ctx = context(false);

    render(
      <DropDownContext.Provider value={ctx}>
        <Trigger>text</Trigger>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('text')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Should display a full-screen div that hides the menu when clicked on', () => {
    const ctx = context(true);
    ctx.setOpen = vitest.fn();

    render(
      <DropDownContext.Provider value={ctx}>
        <Trigger>text</Trigger>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('text')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeInTheDocument();

    act(() => screen.queryByRole('button').click());
    expect(ctx.setOpen).toBeCalledWith(false);
  });

  it('should toggle ctx.show after click', () => {
    const ctx = context(true);
    ctx.toggleOpen = vitest.fn();

    render(
      <DropDownContext.Provider value={ctx}>
        <Trigger>test</Trigger>
      </DropDownContext.Provider>,
    );

    expect(ctx.toggleOpen).toBeCalledTimes(0);

    act(() => screen.getByText('test').click());

    expect(ctx.toggleOpen).toBeCalledTimes(1);
  });
});
