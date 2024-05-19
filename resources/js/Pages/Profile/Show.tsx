import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';

export type ShowPageProps = {
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

export const Show = ({ name, email, description, image, games }: ShowPageProps) => {
    console.log(games)
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
