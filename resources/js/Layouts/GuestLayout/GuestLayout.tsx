import { PropsWithChildren } from 'react';
import { Notification } from '../../Components/Notification/Notification';
import './GuestLayout.css';

type Props = PropsWithChildren<{
  status?: string;
}>;

export const GuestLayout = ({ children, status }: Props) => {
  return (
    <div className="GuestLayout__background min-h-screen p-2 flex flex-col justify-center items-center sm:p-1">
      <Notification message={status} />

      <div className="w-full max-w-md max-[390px]:p-6 bg-transparent-dark backdrop-blur-md shadow-md rounded-2xl flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};
