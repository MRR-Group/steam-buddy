import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
};

export const TagButton = ({
  className = '',
  active,
  children,
  ...props
}: Props) => (
  <button
    {...props}
    className={`m-1 p-px block text-text text-sm font-bold bg-gradient-to-r min-w-16 rounded-xl from-gradient-light via-gradient-medium to-gradient-dark ${className}`}
  >
    <div className={`pl-4 pr-4 pt-2 pb-2 w-full h-full whitespace-nowrap transition-colors rounded-xl ${!active && 'bg-dark text-secondary-500'}`}>
      {children}
    </div>
  </button>
);
