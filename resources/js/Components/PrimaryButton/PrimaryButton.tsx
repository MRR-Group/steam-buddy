import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean,
};

export const PrimaryButton = ({
  className = '',
  disabled,
  children,
  ...props
}: Props) => (
  <button
    {...props}
    className={`m-0 block p-0 text-text text-2xl h-14 bg-gradient-to-r w-full rounded-md from-gradient-light via-gradient-medium to-gradient-dark ${disabled && 'opacity-25'} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);
