import { useRef, useState } from 'react';
import menuIcon from '../../../assets/menu.svg';
import { Link } from '@inertiajs/react';
import { hideAnimation, showAnimation } from './Menu.animations';
import { MenuItem } from './Menu';

type Props = {
  items?: MenuItem[];
};

export const MenuMobile = ({ items = [] }: Props) => {
  const [show, setShow] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const button = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const refs = {
      button: button.current,
      nav: nav.current,
      content: content.current,
    };

    if (!isAnimationPlaying) {
      setIsAnimationPlaying(true);

      if (!show) {
        showAnimation(items.length)(refs, () => setIsAnimationPlaying(false));
      } else {
        hideAnimation(refs, () => setIsAnimationPlaying(false));
      }

      setShow((prevState) => !prevState);
    }
  };

  return (
    <div className="absolute">
      <div className="relative">
        <div
          ref={button}
          role="button"
          onClick={toggle}
          aria-description="Show/Hide navigation"
          className="w-8 h-8 top-0 left-6 bg-no-repeat relative z-10 rounded-md border-gradient-dark bg-contain bg-center"
          style={{ backgroundImage: `url(${menuIcon})` }}
        />
        
        <div
          ref={nav}
          className={`absolute p-px -top-2 left-3 rounded-xl bg-gradient-to-r from-gradient-light via-gradient-medium to-gradient-dark opacity-0 w-40 hidden`}
        >
          <nav className="pt-8 pb-2 bg-dark rounded-xl shadow-md w-full h-full">
            <div ref={content} className="w-full h-full opacity-0">
              {items.map(([name, url]) => (
                <Link
                  href={url}
                  key={url}
                  className="block w-full h-9 pb-2 pt-2 text-xl text-text hover:text-gradient-light"
                >
                  {name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
