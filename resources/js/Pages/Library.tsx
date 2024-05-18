import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../Layouts/AuthenticatedLayout/AuthenticatedLayout';

type Props = {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
  games: {
    id: number;
    cover: string;
    description: string;
    name: string;
    play_time: number;
    tags: string[];
  }[];
};

type TextNode = ChildNode & { data: string };

export const Library = ({ auth, games }: Props) => {
  const getText = (html: string) => {
    const content = document.createElement('div');
    content.innerHTML = html;

    let text = ``;

    for (const node of content.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        text += (node as TextNode).data;
      }
    }

    return text;
  };

  const limitText = (text: string, limit: number) => {
    if (text.length <= limit) {
      return text;
    }

    return `${text.slice(0, limit)}...`;
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Library
        </h2>
      }
    >
      <Head title="Library" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You're logged in!</div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center flex-wrap items-start">
        {games.map(({ id, cover, description, name, play_time, tags }) => (
          <div key={id} className="w-60">
            <h3>{name}</h3>
            <img src={cover} className="w-60" />
            <p>Playtime: {Math.floor(play_time / 60)}h</p>
            <p>{limitText(getText(description), 500)}</p>
            <p>TAGS: {tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
};
