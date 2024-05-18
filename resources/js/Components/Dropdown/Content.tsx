import { Fragment, useContext } from 'react';
import { DropDownContext } from './Context';
import { Transition } from '@headlessui/react';

export const Content = ({
  align = 'right',
  contentClasses = 'py-1 bg-white',
  small,
  children,
}) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = 'origin-top';

  if (align === 'left') {
    alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
  } else if (align === 'right') {
    alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
  }

  let widthClasses = '';

  if (!small) {
    widthClasses = 'w-48';
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          role="button"
          className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
          onClick={() => setOpen(false)}
        >
          <div
            className={
              'rounded-md ring-1 ring-black ring-opacity-5 ' + contentClasses
            }
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

Content.propTypes = {
  align: PropTypes.string,
  small: PropTypes.bool,
  contentClasses: PropTypes.string,
  children: PropTypes.node,
};
