import { PropsWithChildren } from 'react';
import { Notification } from '../../Components/Notification/Notification';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import './GuestLayout.css';
import axios from 'axios';

type Props = PropsWithChildren<{
  status?: string;
}>;

export const GuestLayout = ({ children, status }: Props) => {
  const { getLocales, currentLocale, setLocale } = useLaravelReactI18n();
  const changeLocale = (locale: string) => () => {
    axios.post(route('lang.set', { locale }));
    setLocale(locale);
    localStorage.setItem("lang", locale);
  }

  return (
    <div className="GuestLayout__background min-h-screen p-2 flex flex-col justify-center items-center sm:p-1">
      <Notification message={status} />
   
      <div className="w-full max-w-md max-[390px]:p-6 bg-transparent-dark backdrop-blur-md shadow-md rounded-2xl flex flex-col justify-center items-center">
        {children}

        <div className='absolute bottom-2 left-4 text-xs text-text flex justify-between w-8 cursor-pointer'>
          { getLocales().map(locale => (
            <div className={locale == currentLocale() ? "font-bold" : "font-normal"} onClick={changeLocale(locale)} key={locale}>
              {locale}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
