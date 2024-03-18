import { useState } from 'react';
import PropTypes from 'prop-types';
import { DropDownContext } from './Context';
import { Trigger } from './Trigger';
import { Content } from './Content';
import { DropdownLink } from './DropdownLink';

export const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
