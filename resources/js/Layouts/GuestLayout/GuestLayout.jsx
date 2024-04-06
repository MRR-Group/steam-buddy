import PropTypes from 'prop-types';
import './GuestLayout.css';

export const GuestLayout = ({ children }) => {
  return (
    <div className="GuestLayout__background min-h-screen flex flex-col justify-center items-center p-2 sm:p-0">
      <div className="w-full max-w-md max-[390px]:p-6 bg-transparent-dark backdrop-blur-md shadow-md rounded-2xl flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

GuestLayout.propTypes = {
  children: PropTypes.node,
};
