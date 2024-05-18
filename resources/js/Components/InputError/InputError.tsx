import PropTyps from 'prop-types';

export const InputError = ({ message, className = '', ...props }) => {
  return message ? (
    <p {...props} className={`text-sm text-error font-bold ${className}`}>
      {message}
    </p>
  ) : null;
};

InputError.propTypes = {
  message: PropTyps.string,
  className: PropTyps.string,
};
