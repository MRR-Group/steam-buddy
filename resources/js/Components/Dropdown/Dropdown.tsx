import { PropsWithChildren, useState } from 'react';
import { DropDownContext } from './Context';
import { Content } from './Content';
import { Trigger } from './Trigger';
import { DropdownLink } from './DropdownLink';

type Props = PropsWithChildren;

export const Dropdown = ({ children }: Props) => {
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

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
