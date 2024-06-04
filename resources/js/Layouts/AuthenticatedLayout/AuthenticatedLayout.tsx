import { PropsWithChildren } from 'react';
import "./AuthenticatedLayout.css"
import { Menu } from '../../Components/Menu/Menu';
import { Notification } from '../../Components/Notification/Notification';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useTranslate } from '../../Hooks/Translate/Translate';
import axios from 'axios';

type Props = PropsWithChildren<{
  status?: string;
  user: {
    id: number,
    name: string;
    email: string;
  };
  title: string;
}>;

export const AuthenticatedLayout = ({ children, title, user, status }: Props) => {
  const { currentLocale, setLocale } = useLaravelReactI18n();
  const { t } = useTranslate("app");

  const toggleLocale = () => {
    const locale = currentLocale() == "en" ? "pl" : "en";

    axios.post(route('lang.set', { locale }));
    setLocale(locale);
    localStorage.setItem("lang", locale);
  }

  return (
    <div className="AuthenticatedLayout__background min-h-screen h-full flex flex-col items-center">
      <div className="w-full lg:w-10/12 sm:pl-2 sm:pr-2 h-full min-h-screen flex flex-col p-2 sm:p-1">
        <div className="text-center flex justify-start h-14 w-full relative mt-4 mb-4">
          <Notification message={status} />
          
          <h1 className='text-text text-2xl w-full text-center'>{title}</h1>
          <Menu
            items={[
              [t("Games"), route('library')],
              [t("Profile"), route('profile.show', { id: user.id })],
              [t("Invites"), route('invite.show')],
              [t("Polish Version"), toggleLocale],
              [t("Log out"), route('logout'), "post"],
            ]}
          />
        </div>
        
        { children }
      </div>
    </div>
  );
};
