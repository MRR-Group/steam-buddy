import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';

export type ShowPageProps = {
  id: number;
  name: string;
  email: string;
  description: string;
  image: string;
  games: {
    id: number;
    name: string;
    tags: string[];
    cover: string;
  }[];
};

export const Show = ({ id, name, email, image, games }: ShowPageProps) => {
  return (
    <AuthenticatedLayout
      user={{ id, name, email }}
      title='Profile'
    >
      <Head title="Profile" />
      <img src={image} alt="" />
      <div className="flex w-full justify-center flex-wrap items-start">
        {games.map(({ id, cover, name, tags }) => (
          <div key={id} className="w-60">
            <h3>{name}</h3>
            <img src={cover} className="w-60" />
            <p>TAGS: {tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
};
