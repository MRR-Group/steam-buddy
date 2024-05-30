import { Head, Link } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { Tags } from '../../Components/Tags/Tags';
import { TextInput } from '../../Components/TextInput/TextInput';
import { GameLink } from '../../Components/GameLink/GameLink';
import { SmallButton } from '../../Components/SmallButton/SmallButton';

type Invite = {
  id: number
  sender: {
    id: number
    name: string
  }
  receiver: {
    id: number
    name: string
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
  console.log(accepted)
  return (
    <AuthenticatedLayout
      user = {user}
      title='Invites'
    >
      <Head title="Invites" />

      <h1>Sent Invites</h1>
      {sent.map((invite) => (
        <div>
          <h3>{invite.receiver.name} - {invite.game.name}</h3>
          <p>Status: {invite.is_rejected ? "rejected" : invite.is_accepted ? "accepted" : "pending"}</p>
        </div>
      ))}

      <h1>Received Invites</h1>
      {received.map((invite) => (
        <div>
          <h3>{invite.sender.name} - {invite.game.name}</h3>
          <Link href={route('invite.update', {id: invite.id})} as='button' method='patch' data={{is_accepted: true}}><SmallButton>Accept</SmallButton></Link>
          <Link href={route('invite.update', {id: invite.id})} as='button' method='patch' data={{is_rejected: true}}><SmallButton>Reject</SmallButton></Link>
        </div>
      ))}

      <h1>Accepted Invites</h1>
      {accepted.map((invite) => (
        <div>
          <h3>{invite.sender.name} - {invite.game.name}</h3>
          <p>https://steamcommunity.com/profiles/{invite.steam_id}/</p>
          <Link href={route('invite.remove', {id: invite.id})} as='button' method='delete'><SmallButton>Remove</SmallButton></Link>
        </div>
      ))}

      {/* <Link href={route('match.invite', {user_id: id, game_id: game.id})} as='button' method='post'><SmallButton>Send Invite</SmallButton></Link> */}
    </AuthenticatedLayout>
  );
};