import { Head, Link } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { SmallButton } from '../../Components/SmallButton/SmallButton';
import { useTranslate } from '../../Hooks/Translate/Translate';

type Invite = {
  id: number
  target: {
    id: number
    name: string,
    image: string,
  }
  game: {
    id: number
    name: string
  }
  is_accepted: boolean
  is_rejected: boolean
}

export type ShowPageProps = {
  user:{
    id: number
    name: string
    email: string
  }
  sent: Invite[]
  received: Invite[]
  accepted: (Invite & {steam_id: string})[]
};

export const Show = ({user, sent, received, accepted}: ShowPageProps) => {
  console.log(received, sent, accepted);

  const { t, Translate } = useTranslate("app");

  return (
    <AuthenticatedLayout
      user = {user}
      title={t("Invites")}
    >
      <Head title={t("Invites")} />
      
      <div className='flex flex-col flex-1'>
        <section className='flex flex-col items-center mb-auto'>
          <h2 className='text-text text-3xl text-center mb-3'>
            <Translate>Sent Invites</Translate>
          </h2>
          {sent.map((invite) => (
            <div className='bg-transparent-dark-200 rounded-2xl text-text mb-3 w-full max-w-lg h-20 flex justify-between items-center p-2' key={invite.id}>
              <img src={invite.target.image} alt={t(`Profile image of user`, { name: invite.target.name})} className='h-full rounded-xl' />

              <div className='w-full text-center'>
                <h3 className='text-xl'>{invite.target.name} - {invite.game.name}</h3>
                <p><Translate>Status</Translate>: <Translate>{invite.is_rejected ? "rejected" : invite.is_accepted ? "accepted" : "pending"}</Translate></p>
              </div>
            </div>
          ))}
        </section>

        <section className='flex flex-col items-center mb-auto'>
          <h2 className='text-text text-3xl text-center mb-3'>
            <Translate>Received Invites</Translate>
          </h2>
          {received.map((invite) => (
            <div className='bg-transparent-dark-200 rounded-2xl text-text mb-3 w-full max-w-lg h-20 flex justify-between items-center p-2' key={invite.id}>
              <img src={invite.target.image} alt={t(`Profile image of user`, { name: invite.target.name})} className='h-full rounded-xl' />

              <h3 className='text-xl text-center'>{invite.target.name}<br/>{invite.game.name}</h3>
              
              <div className='flex h-full flex-col justify-between'>
                <Link href={route('invite.update', {id: invite.id})} as='button' method='patch' data={{is_accepted: true}}><SmallButton><Translate>Accept</Translate></SmallButton></Link>
                <Link href={route('invite.update', {id: invite.id})} as='button' method='patch' data={{is_rejected: true}}><SmallButton><Translate>Reject</Translate></SmallButton></Link>
              </div>
            </div>
          ))}
        </section>

        <section className='flex flex-col items-center mb-auto'>
          <h2 className='text-text text-3xl text-center mb-3'>
            <Translate>Accepted Invites</Translate>
          </h2>
          {accepted.map((invite) => (
            <div className='bg-transparent-dark-200 rounded-2xl text-text mb-3 w-full max-w-lg h-20 flex justify-between items-center p-2' key={invite.id}>
              <img src={invite.target.image} alt={t(`Profile image of user`, { name: invite.target.name})} className='h-full rounded-xl' />

              <h3 className='text-xl text-center'>
                <a target="_blank" href={`https://steamcommunity.com/profiles/${invite.steam_id}/`} rel="noreferrer">{invite.target.name} <br/> {invite.game.name}</a>
              </h3>
              
              <Link href={route('invite.remove', {id: invite.id})} as='button' method='delete'><SmallButton><Translate>Remove</Translate></SmallButton></Link>
            </div>
          ))}
        </section>
      </div>
    </AuthenticatedLayout>
  );
};
