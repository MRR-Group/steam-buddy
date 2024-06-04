import { Link } from '@inertiajs/react';

type Props = {
  left?: string,
  linkText?: string,
  right?: string,
  href?: string,
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete',
};

export const TextInputOption = ({
  left = '',
  linkText = '',
  right = '',
  href = '/',
  method = 'get',
}: Props) => (
  <div className="w-full mt-2 text-sm flex justify-between items-center text-text">
    <div className="block pr-5">{left}</div>
    <div className='text-right'>
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
