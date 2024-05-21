import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { Tags } from '../../Components/Tags/Tags';
import { TextInput } from '../../Components/TextInput/TextInput';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';

export type ShowPageProps = {
  user_id: number;
  user_name: string;
  user_email: string;
  game_name: string;
  game_description: string;
  game_cover: string;
  game_tags: string[];
  is_owner: boolean;
};

type TextNode = ChildNode & { data: string };

export const ShowGame = ({ user_id, user_name, user_email, game_name, game_description, game_cover, game_tags, is_owner }: ShowPageProps) => {
  const tags = useMemo(() => game_tags.map((tag) => ({ name: tag, games: 0 })), [game_tags]);

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
  }

  const text = useMemo(() => limitText(getText(game_description), 200), [game_description])

  return (
    <AuthenticatedLayout
      user={{ id: user_id, name: user_name, email: user_email }}
      title={game_name}
    >
      <Head title={game_name} />
      <img src={game_cover} alt="" />

      <Tags selected={game_tags} tags={tags} />

      <p>{text}</p>

      {
        is_owner && (
          <PrimaryButton>Find Mate</PrimaryButton>
        )
      }

    </AuthenticatedLayout>
  );
};
