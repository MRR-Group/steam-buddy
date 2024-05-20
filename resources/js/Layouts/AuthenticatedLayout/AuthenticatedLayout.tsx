import { PropsWithChildren } from 'react';
import "./AuthenticatedLayout.css"
import { Menu } from '../../Components/Menu/Menu';

type Props = PropsWithChildren<{
  user: {
    id: number,
    name: string;
    email: string;
  };
  title: string;
}>;

export const AuthenticatedLayout = ({ children, title, user }: Props) => {
  return (
    <div className="AuthenticatedLayout__background min-h-screen p-2 flex flex-col justify-center items-center sm:p-1">
      <div className="AuthenticatedLayout__top-panel" />
      <div className="text-center flex justify-start items-center h-14 w-full relative p-4">
        <h1 className='text-text text-2xl w-full text-center'>{title}</h1>
        <Menu
          items={[
            ["Games", route('library')],
            ["Profile", route('profile.show', { id: user.id })],
            ["Edit Profile", route('profile.edit')],
            ["Log out", route('logout')]
          ]}
        />
      </div>

      { children }
    </div>
  );
};
