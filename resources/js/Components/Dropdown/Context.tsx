import { createContext } from 'react';

export type DropDownContext = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
};

export const DropDownContext = createContext<DropDownContext>({
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
});
