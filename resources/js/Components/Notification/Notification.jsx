import PropTyps from 'prop-types';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export const Notification = ({ message = null }) => {
  const [isHidden, setIsHidden] = useState(true);
  const hide = () => setIsHidden(true);

  useEffect(() => {
    if (message) {
      setIsHidden(false);
    }
  }, [message]);

  return (
    <div
      className={`fixed top-0 w-full p-2 transition origin-top-right ${isHidden ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      role="alert"
    >
      <div className="text-sm p-2 w-full text-center relative flex justify-center items-center text-text bg-gradient-to-r from-gradient-light via-gradient-medium to-gradient-dark">
        {message}
        <div
          role="button"
          aria-label="Close"
          className="absolute right-2 cursor-pointer"
          onClick={hide}
        >
          <IoCloseOutline className="fill-text size-5 hover:scale-150 active:scale-90 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTyps.string,
};
