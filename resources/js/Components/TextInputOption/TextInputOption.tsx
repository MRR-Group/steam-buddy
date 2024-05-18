import { Link } from '@inertiajs/react';

export const TextInputOption = ({
  left = '',
  linkText = '',
  right = '',
  href = '/',
  method = 'get',
}) => {
  return (
    <div className="w-full mt-2 text-sm flex justify-between items-center text-text">
      <div className="block pr-5">{left}</div>
      <div>
        <Link
          className="text-primary-500 font-bold hover:text-primary-800 transition-colors duration-300"
          href={href}
          method={method}
        >
          {linkText}
        </Link>
        <br />
        {right}
      </div>
    </div>
  );
};

TextInputOption.propTypes = {
  left: PropTypes.string,
  linkText: PropTypes.string,
  right: PropTypes.string,
  href: PropTypes.string,
  method: PropTypes.oneOf(['get', 'post', 'put', 'patch', 'delete']),
};
