import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef } from 'react';

export const TextInput = forwardRef(
  ({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
    const input = useRef();

    useEffect(() => {
      if (isFocused) {
        (ref ?? input).current.focus();
      }
    }, [isFocused, input, ref]);

    return (
      <input
        {...props}
        type={type}
        className={
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
          className
        }
        ref={ref ?? input}
      />
    );
  },
);

TextInput.displayName = 'TextInput';
TextInput.propTypes = {
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  type: PropTypes.string,
};
