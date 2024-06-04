import { Head, Link } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo, useState } from 'react';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { Statistics } from '../../Components/Statistics/Statistics';
import { Achievements } from '../../Components/Achievements/Achievements';
import { useTranslate } from '../../Hooks/Translate/Translate';

export type ShowPageProps = {
  status?: string
  user:{
    id: number
    name: string
    email: string
    description: string
  }
  game: {
    id: number
    name: string
    cover: string
    steam_id: string
  }
  candidates: {
    id: number
    name: string
    description: string
    image: string
    statistics: {
      play_time: number
      game_completion: number
      similar_achievements: number
      achievements: {
        id: number
        name: string
        steam_id: string
        unlocked_at: number
        description: string
        icon: string
      }[]
    }
  }[]
};

export const Show = ({user, game, candidates, status}: ShowPageProps) => {
  const[candidate, setCandidate] = useState(0)
  const {id, name, image, description, statistics} = useMemo(()=> candidates[candidate] ?? {}, [candidate, candidates]);
  const { t, Translate } = useTranslate("app");

  const nextCandidate = () => setCandidate(i => i + 1);
  const previousCandidate = () => setCandidate(i => i - 1);

  if (candidates.length == 0) {
    return (
      <AuthenticatedLayout
        user = {user}
        title={t("Matching")}
      >
        <Head title={t("Matching")} />

        <section className='flex flex-col items-center justify-center flex-1'>
          <h2 className='text-text font-bold text-xl mb-2' ><Translate name={game.name}>No matches found for</Translate></h2>
          
          <p className='text-text text-md max-w-xl'>
            <Translate name={game.name}>You are the only user message</Translate>
          </p>

          <Link href={route("profile.games.show", { user_id: user.id, game_id: game.id })}  className="w-full max-w-md mt-8">
            <PrimaryButton>
              <Translate>Back</Translate>
            </PrimaryButton>
          </Link>

          <Link href={route("library")} className="w-full max-w-md mt-2">
            <PrimaryButton>
              <Translate>Check other games</Translate>
            </PrimaryButton>
          </Link>
        </section>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout
      user = {user}
      title={t("Matching")}
      status = {status}
    >
      <Head title={t("Matching")} />

      <div className='flex flex-col justify-between flex-1'>
        <div className='flex flex-wrap justify-evenly 3xl:justify-between items-center pt-8'>
          <section className='flex w-full p-2 flex-col md:flex-row justify-center items-center text-text max-w-3xl mb-3'>
            <img src={image} alt={t(`Profile image of user`, { name })} className='h-52 md:mr-5' />
            
            <div className='mt-5 md:mt-0'>
              <h2 className='text-xl font-bold text-left'>
                {name}
              </h2>

              <div>
                {description}
              </div>
            </div>
          </section>
          
          <section className='xs:h-[230px] h-[146px] bg-transparent-dark-300 md:bg-transparent-dark-100 rounded-2xl flex items-start text-text w-full max-w-3xl 3xl:max-w-2xl mb-3'>
            <Statistics 
              game_cover={game.cover}
              game_name={game.name}
              user_name={name}
              statistics={statistics}
            />
          </section>

          <section className='w-full'>
            <Achievements achievements={statistics.achievements} />
          </section>
        </div>

        <div className='w-full flex flex-col items-center justify-center pt-8 md:pb-8'>
          <Link href={route("profile.show", { id })}  className="w-full max-w-md mt-2">
            <PrimaryButton className="max-w-md">
              <Translate>See Profile</Translate>
            </PrimaryButton>
          </Link>
          
          {candidate < candidates.length-1 && <PrimaryButton className="max-w-md mt-2" onClick={nextCandidate}><Translate>Next</Translate></PrimaryButton>}
          {candidate > 0 && <PrimaryButton className="max-w-md mt-2" onClick={previousCandidate}><Translate>Previous</Translate></PrimaryButton>}

          <Link href={route("profile.games.show", { user_id: user.id, game_id: game.id })}  className="w-full max-w-md mt-2">
            <PrimaryButton className="max-w-md"><Translate>Back</Translate></PrimaryButton>
          </Link>

          <Link href={route('invite.send', {user_id: id, game_id: game.steam_id})} as='button' method='post'  className="w-full max-w-md mt-2"><PrimaryButton className="max-w-md"><Translate>Send Invite</Translate></PrimaryButton></Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
