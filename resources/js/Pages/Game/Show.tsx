import { Head, Link, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo } from 'react';
import { Tags } from '../../Components/Tags/Tags';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { Game } from '../../Components/Game/Game';

// className='xl:h-auto lg:w-full lg:h-auto sm:w-6/12 xs:w-8/12 w-full h-auto'
// blurredImgClassName='w-full h-full md:min-h-96 max-h-full'
// imgClassName='max-h-full'

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

      else if (node.nodeName === "BR") {
        text += "\n";
      }
    }

    text = text.trim().replaceAll("\n\n", "\n");

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
      <Tags
        selected={game_tags}
        tags={tags}
        tagRole='button'
        itemAriaLabel={({name}) => `Search games with ${name} tag`}
        onUnselect={showGamesWithTag}
      />


      <div className='w-full flex flex-col items-center lg:items-stretch lg:flex-row lg:justify-between lg:h-[calc(100%-13rem)] lg:min-h-[750px]'>
        <div className='flex items-center justify-center w-full xs:w-3/4  sm:w-1/2 md:w-1/2 lg:w-full h-full max-w-lg pr-5 pl-5 lg:pl-1'>
          <Game
            game_cover={game_cover}
            game_name={game_name}
          />
        </div>

        <div className='lg:w-2/4 flex flex-col justify-between items-center'>
          <p className=' text-text font-inter p-2 w-full whitespace-pre-line h-full flex justify-center items-center'>
            {text}
          </p>

          {
            is_owner && (
              <Link method='post' href={route('match.find', {game_id})} className="w-full flex justify-center">
                <div className='p-5 pt-3 w-full md:max-w-80'>
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
