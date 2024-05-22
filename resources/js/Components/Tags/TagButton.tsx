import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  active?: boolean,
  className?: string,
  label: string,
  role?: "button" | "checkbox"
};

export const TagButton = ({
  className = '',
  active,
  children,
  role = "button",
  label,
  ...props
}: Props) => (
  <div
    {...props}
    className={`m-1 p-px block text-text text-sm font-bold bg-gradient-to-r min-w-16 rounded-xl from-gradient-light via-gradient-medium to-gradient-dark ${className}`}
  >
    <div
      className={`pl-4 pr-4 pt-2 pb-2 w-full h-full whitespace-nowrap transition-colors rounded-xl ${!active && 'bg-dark text-secondary-300'}`} 
      aria-checked={active ?? false}
      role={role}
      aria-label={label}
    >
      {children}
    </div>
  </div>
);
