import {
  InputHTMLAttributes,
  MutableRefObject,
  forwardRef,
  useEffect,
  useRef,
} from 'react';

type Props = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value'> & {
  isFocused?: boolean;
  label?: string;
  value?: string;
  areaClassName?: string
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className = '',
      areaClassName = '',
      isFocused = false,
      name = '',
      label = '',
      value = '',
      ...props
    },
    ref,
  ) => {
    const ariaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (isFocused) {
        ((ref as MutableRefObject<HTMLTextAreaElement>) ?? ariaRef).current.focus();
      }
    }, [isFocused, ariaRef, ref]);

    return (
      <div className={`group relative ${className}`}>
        <label
          htmlFor={name}
          className={`absolute top-0 left-0 group-focus-within:font-bold group-focus-within:text-sm text-text group-hover:font-bold transition-all duration-300`}
        >
          {label}
        </label>

        <textarea
          {...props}
          id={name}
          name={name}
          value={value}
          className={`w-full h-full text-center pt-8 bg-transparent p-0 text-text border-transparent focus:border-transparent focus:ring-0 box-border ${areaClassName}`}
          ref={ref ?? ariaRef}
        />

        <div className="w-full h-2 absolute bottom-0 left-0 border-b-2 border-text group-hover:border-b-4 group-focus-within:border-b-4 transition-all duration-300"></div>
      </div>
    );
  },
);

TextArea.displayName = 'TextInput';
