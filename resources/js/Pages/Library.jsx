import PropTypes from 'prop-types';
import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export const Library = ({ auth, games }) => {
  const getText = (html) => {
    const content = document.createElement('div');
    content.innerHTML = html;

    let text = ``;

    for (let node of content.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.data;
      }
    }

    return text;
  };

  const limitText = (text, limit) => {
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

Library.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.any,
  }),
  games: PropTypes.array,
};
