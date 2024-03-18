import { useContext } from 'react';
import PropTypes from 'prop-types';
import { DropDownContext } from './Context';

export const Trigger = ({ children }) => {
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

Trigger.propTypes = {
  children: PropTypes.node,
};
