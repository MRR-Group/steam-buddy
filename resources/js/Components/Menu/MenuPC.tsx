import { Link } from '@inertiajs/react';
import { MenuItem } from './Menu';
import { useMemo } from 'react';

type Props = {
  items?: MenuItem[];
};

export const MenuPC = ({ items = [] }: Props) => {
  const width = useMemo(() => `${(items.length - 1) * 6.5}rem`, [items]);

  return (
    <>
      <div className="absolute p-px top-0 left-0 rounded-xl bg-gradient-to-r from-gradient-light via-gradient-medium to-gradient-dark h-14" style={{ width }}>
          <nav className="bg-dark rounded-xl shadow-md flex justify-evenly h-full items-center">
              {items.slice(0, -1).map(([name, url]) => (
                <Link
                  href={url}
                  key={url}
                  className="text-xl text-text hover:text-gradient-light"
                >
                  {name}
                </Link>
              ))}
          </nav>
        </div>

        <div className="absolute p-px top-0 right-0 rounded-xl bg-gradient-to-r from-gradient-light via-gradient-medium to-gradient-dark w-28 h-14">
          <nav className="w-full h-full bg-dark rounded-xl shadow-md flex justify-center items-center">
              {items.slice(-1).map(([name, url]) => (
                <Link
                  href={url}
                  key={url}
                  className="block text-xl text-text hover:text-gradient-light"
                >
                  {name}
                </Link>
              ))}
          </nav>
        </div>
    </>
  );
};
