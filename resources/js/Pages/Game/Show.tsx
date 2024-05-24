import { Head, Link, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo } from 'react';
import { Tags } from '../../Components/Tags/Tags';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';

export type ShowPageProps = {
  user_id: number;
  user_name: string;
  user_email: string;
  game_id: number;
  game_name: string;
  game_description: string;
  game_cover: string;
  game_tags: string[];
  is_owner: boolean;
};

type TextNode = ChildNode & { data: string };

export const Show = ({ user_id, user_name, user_email, game_id, game_name, game_description, game_cover, game_tags, is_owner }: ShowPageProps) => {
  const tags = useMemo(() => game_tags.map((tag) => ({ name: tag })), [game_tags]);

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

  const text = useMemo(() => limitText(getText(game_description), 1000), [game_description])

  const showGamesWithTag = (tag: string) => {
    if (is_owner) {
      router.get(route("library", { _query: { tags: tag }}));
    }
    else {
      router.get(route("profile.show", { id: user_id, _query: { tags: tag }}));
    }
  }

  return (
    <AuthenticatedLayout
      user={{ id: user_id, name: user_name, email: user_email }}
      title="Game Details"
    >
      <Head title={game_name} />

      <h1 className='text-text text-4xl w-full text-center mb-8'>{game_name}</h1>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='flex justify-center mb-2'>
          <img
            src={game_cover}
            className='w-10/12 rounded-xl'
            alt={`Cover image of the game "${game_name}"`}
          />
        </div>

        <div className='md:w-2/4 flex flex-col justify-between items-center'>
          <Tags
            selected={game_tags}
            tags={tags}
            tagRole='button'
            itemAriaLabel={({name}) => `Search games with ${name} tag`}
            onUnselect={showGamesWithTag}
          />

          <p className='text-justify text-text font-inter p-2'>
            {text}
          </p>

          {
            is_owner && (
              <Link method='post' href={route('match.find', {game_id})}>
                <div className='p-2 pt-0 w-full md:max-w-80'>
                  <PrimaryButton type='submit'>Find Mate</PrimaryButton>
                </div>
              </Link>
            )
          }
        </div>
    </div>
    </AuthenticatedLayout>
  );
};
