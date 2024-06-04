import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const SmallButton = ({
  className = '',
  disabled,
  children,
  ...props
}: Props) => (
  <button
    {...props}
    className={`m-0 block pl-2 pr-2 pt-1 pb-1  text-text text-sm font-bold bg-gradient-to-r min-w-16 rounded-lg from-gradient-light via-gradient-medium to-gradient-dark ${disabled && 'opacity-25'} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);
