import PropTypes from 'prop-types';
import './GuestLayout.css';
import { Notification } from '@/Components/Notification/Notification';

export const GuestLayout = ({ children, status }) => {
  return (
    <div className="GuestLayout__background min-h-screen p-2 flex flex-col justify-center items-center sm:p-1">
      <Notification message={status} />

      <div className="w-full max-w-md max-[390px]:p-6 bg-transparent-dark backdrop-blur-md shadow-md rounded-2xl flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

GuestLayout.propTypes = {
  status: PropTypes.string,
  children: PropTypes.node,
};
