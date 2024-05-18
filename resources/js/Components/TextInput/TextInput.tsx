import { forwardRef, useEffect, useMemo, useRef } from 'react';

export const TextInput = forwardRef(
  (
    {
      type = 'text',
      className = '',
      isFocused = false,
      name = '',
      label = '',
      value = '',
      ...props
    },
    ref,
  ) => {
    const input = useRef();
    const empty = useMemo(() => value.length == 0, [value]);

    useEffect(() => {
      if (isFocused) {
        (ref ?? input).current.focus();
      }
    }, [isFocused, input, ref]);

    return (
      <div
        className={`group h-12 w-full relative border-b-2 border-text hover:border-b-4 focus-within:border-b-4 transition-all duration-300 ${className}`}
      >
        <label
          htmlFor={name}
          className={`absolute ${empty ? 'top-3 text-xl' : 'top-0 text-sm'} group-focus-within:top-0 group-focus-within:font-bold group-focus-within:text-sm text-text group-hover:font-bold transition-all duration-300`}
        >
          {label}
        </label>

        <input
          {...props}
          id={name}
          name={name}
          type={type}
          className="absolute bottom-0 w-full text-center bg-transparent p-0 text-text border-transparent focus:border-transparent focus:ring-0"
          ref={ref ?? input}
        />
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};
