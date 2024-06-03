import { Head, Link, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo } from 'react';
import { Tags } from '../../Components/Tags/Tags';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { Game } from '../../Components/Game/Game';
import { Statistics } from '../../Components/Statistics/Statistics';
import { Achievements } from '../../Components/Achievements/Achievements';

export type ShowPageProps = {
  user: {
    id: number
    name: string
    email: string
  }
  game: {
    id: number
    name: string
    description: string
    cover: string
    play_time: number
    game_completion: number
    similar_achievements?: number
    tags: string[]
    achievements: {
      id: number
      name: string
      steam_id: string
      unlocked_at: number
      description: string
      icon: string
    }[]
  }
  is_owner: boolean
};

type TextNode = ChildNode & { data: string };

export const Show = ({ user, game, is_owner }: ShowPageProps) => {
  const tags = useMemo(() => game.tags.map((tag) => ({ name: tag })), [game]);

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

  const text = useMemo(() => limitText(getText(game.description), 1000), [game])

  const showGamesWithTag = (tag: string) => {
    if (is_owner) {
      router.get(route("library", { _query: { tags: tag }}));
    }
    else {
      router.get(route("profile.show", { id: user.id, _query: { tags: tag }}));
    }
  }

  return (
    <AuthenticatedLayout
      user={user}
      title="Game Details"
    >
      <Head title={game.name} />

      <h1 className='text-text text-4xl w-full text-center mb-8'>{game.name}</h1>
      <Tags
        selected={game.tags}
        tags={tags}
        tagRole='button'
        itemAriaLabel={({name}) => `Search games with ${name} tag`}
        onUnselect={showGamesWithTag}
      />

      <div className='w-full flex flex-col items-center lg:items-stretch lg:flex-row lg:justify-between lg:h-[calc(100vh-14rem)] lg:min-h-[750px]'>
        <div className='flex items-center justify-center w-full xs:w-3/4  sm:w-1/2 md:w-1/2 lg:w-full h-full max-w-lg pr-5 pl-5 lg:pl-1'>
          <Game
            game_cover={game.cover}
            game_name={game.name}
          />
        </div>

        <div className='lg:w-2/4 flex flex-col justify-between items-center'>
          <p className=' text-text font-inter p-2 w-full whitespace-pre-line h-full flex justify-center items-center'>
            {text}
          </p>

          {
            is_owner && (
              <Link method='post' href={route('match.find', {game_id: game.id})} className="w-full flex justify-center">
                <div className='p-5 pt-3 w-full md:max-w-80'>
                  <PrimaryButton type='submit'>Find Mate</PrimaryButton>
                </div>
              </Link>
            )
          }
        </div>
      </div>

      <div>
          <section className='xs:h-[230px] h-[146px] bg-transparent-dark-300 md:bg-transparent-dark-100 rounded-2xl flex items-start text-text w-full mb-3'>
            <Statistics
              game_cover={game.cover}
              game_name={game.name}
              user_name={user.name}
              statistics={game}
              noIcon
            />
          </section>

          <section className='w-full'>
            <Achievements achievements={game.achievements} />
          </section>
      </div>
    </AuthenticatedLayout>
  );
};
