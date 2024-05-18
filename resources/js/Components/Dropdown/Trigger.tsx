import { PropsWithChildren, useContext } from 'react';
import { DropDownContext } from './Context';

type Props = PropsWithChildren;

export const Trigger = ({ children }: Props) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>
      {open && (
        <div
          role="button"
          aria-label="hide menu"
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};
