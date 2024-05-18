import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';

export type ShowPageProps = {
  name: string;
  email: string;
  description: string;
  image: string;
};

export const Show = ({ name, email, description, image }: ShowPageProps) => {
  return (
    <AuthenticatedLayout
      user={{ name, email }}
      header={
        <div>
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Profile
          </h2>
          {description}
        </div>
      }
    >
      <Head title="Profile" />
      <img src={image} alt="" />
    </AuthenticatedLayout>
  );
};
