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
    className={`m-0 block pl-4 pr-4 pt-2 pb-2  text-text text-sm font-bold bg-gradient-to-r min-w-16 rounded-xl from-gradient-light via-gradient-medium to-gradient-dark ${disabled && 'opacity-25'} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);
