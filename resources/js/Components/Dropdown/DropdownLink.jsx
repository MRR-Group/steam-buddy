import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

export const DropdownLink = ({ className = '', children, ...props }) => {
  return (
    <Link
      {...props}
      className={
        'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
        className
      }
    >
      {children}
    </Link>
  );
};

DropdownLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
