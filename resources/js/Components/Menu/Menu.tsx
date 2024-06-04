import { useMediaQuery } from "usehooks-ts";
import { MenuMobile } from "./MenuMobile";
import { MenuPC } from "./MenuPC";

/**
 * [0] - name
 * [1] - url | onClick callback
 * [2] - method
 */
export type MenuItem = [string, string] | [string, string, "post" | "get" | "put" | "patch" | "delete"] | [string, () => void];

type Props = {
  items?: MenuItem[],
};

export const Menu = ({ items = [] }: Props) => {
  const matches = useMediaQuery('(min-width: 1024px)')

  if (matches) {
    return <MenuPC items={items} />
  }
  
  return (
    <MenuMobile items={items} />
  );
};