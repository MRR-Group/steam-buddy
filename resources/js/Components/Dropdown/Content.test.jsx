import { act, render, screen } from '@testing-library/react';
import { expect, vitest } from 'vitest';

import { Content } from './Content';
import { DropDownContext } from './Context';

const context = (value) => ({
  open: value,
  setOpen: () => {},
  toggleOpen: () => {},
});

describe('Content', () => {
  it('should render', () => {
    render(
      <DropDownContext.Provider value={context(true)}>
        <Content>test</Content>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should add additional content css class', () => {
    render(
      <DropDownContext.Provider value={context(true)}>
        <Content>test1</Content>
        <Content contentClasses="m-5">test2</Content>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('test1')).not.toHaveClass('m-5');
    expect(screen.getByText('test2')).toHaveClass('m-5');
  });

  it('should make component smaller if prop small is defined', () => {
    render(
      <DropDownContext.Provider value={context(true)}>
        <Content small>test1</Content>
        <Content>test2</Content>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('test1').parentNode).not.toHaveClass('w-48');
    expect(screen.getByText('test2').parentNode).toHaveClass('w-48');
  });

  it('should hide content if context.open is false', () => {
    const ctx = context(true);

    const { rerender } = render(
      <DropDownContext.Provider value={ctx}>
        <Content>test</Content>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();

    act(() => (ctx.open = false));

    rerender();

    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });

  it('should set open to false after click', () => {
    const ctx = context(true);
    ctx.setOpen = vitest.fn();

    render(
      <DropDownContext.Provider value={ctx}>
        <Content>test</Content>
      </DropDownContext.Provider>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(ctx.setOpen).toBeCalledTimes(0);

    act(() => screen.getByText('test').click());

    expect(ctx.setOpen).toBeCalledTimes(1);
    expect(ctx.setOpen).toHaveBeenCalledWith(false);
  });
});
