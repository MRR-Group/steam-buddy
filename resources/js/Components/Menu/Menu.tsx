import { useMediaQuery } from "usehooks-ts";
import { MenuMobile } from "./MenuMobile";

/**
 * [0] - name
 * [1] - url
 */
export type MenuItem = [string, string];

type Props = {
  items?: MenuItem[];
};

export const Menu = ({ items = [] }: Props) => {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <MenuMobile items={items} />
  );
};