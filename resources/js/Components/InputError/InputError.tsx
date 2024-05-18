import { ParamHTMLAttributes } from 'react';

type Props = ParamHTMLAttributes<HTMLParagraphElement> & {
  message?: string;
};

export const InputError = ({ message, className = '', ...props }: Props) => {
  return message ? (
    <p {...props} className={`text-sm text-error font-bold ${className}`}>
      {message}
    </p>
  ) : null;
};
