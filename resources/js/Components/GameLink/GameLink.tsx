import { InertiaLinkProps, Link } from "@inertiajs/react";

type Props = Omit<InertiaLinkProps, 'href'> & {
  game_id: number;
  game_name: string;
  game_cover: string;
  user_id: number;
  user_name: string;
};

export const GameLink = ({ user_id, user_name, game_id, game_name, game_cover, ...props }: Props) => (
  <div className="w-32 md:w-44 xl:w-60 p-2">
    <Link href={route("profile.games.show", [ user_id, game_id ])} aria-label={`Navigate to ${user_name} statistics for the game "${game_name}"`} {...props}>
      <img src={game_cover} className="w-60 rounded-2xl" alt={`Cover image of the game "${game_name}"`} />
    </Link>
  </div>
);