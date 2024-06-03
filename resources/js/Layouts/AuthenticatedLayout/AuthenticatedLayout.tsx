import { PropsWithChildren } from 'react';
import "./AuthenticatedLayout.css"
import { Menu } from '../../Components/Menu/Menu';
import { Notification } from '../../Components/Notification/Notification';

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
  return (
    <div className="AuthenticatedLayout__background min-h-screen h-full flex flex-col items-center">
      <div className="w-full lg:w-10/12 sm:pl-2 sm:pr-2 h-full min-h-screen flex flex-col p-2 sm:p-1">
        <div className="text-center flex justify-start h-14 w-full relative mt-4 mb-4">
          <Notification message={status} />
          
          <h1 className='text-text text-2xl w-full text-center'>{title}</h1>
          <Menu
            items={[
              ["Games", route('library')],
              ["Profile", route('profile.show', { id: user.id })],
              ["Invites", route('invite.show')],
              ["Log out", route('logout'), "post"]
            ]}
          />
        </div>

        { children }
      </div>
    </div>
  );
};
