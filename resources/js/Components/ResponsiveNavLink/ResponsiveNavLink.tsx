import { InertiaLinkProps, Link } from '@inertiajs/react';

type Props = Omit<InertiaLinkProps, 'href'> & {
  href?: string;
  active?: boolean;
};

export const ResponsiveNavLink = ({
  active = false,
  href = '/',
  className = '',
  children,
  ...props
}: Props) => {
  const activeCss = active
    ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
    : 'border-transparent text-text hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300';

  return (
    <Link
      {...props}
      href={href}
      className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ${activeCss} ${className}`}
    >
      {children}
    </Link>
  );
};
