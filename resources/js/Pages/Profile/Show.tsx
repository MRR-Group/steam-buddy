import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';

export type ShowPageProps = {
  id: number;
  name: string;
  email: string;
  description: string;
  image: string;
};

export const Show = ({ id, name, email, image }: ShowPageProps) => {
  return (
    <AuthenticatedLayout
      user={{ id, name, email }}
      title='Profile'
    >
      <Head title="Profile" />
      <img src={image} alt="" />
    </AuthenticatedLayout>
  );
};
