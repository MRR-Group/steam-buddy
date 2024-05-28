import { InertiaLinkProps, Link } from "@inertiajs/react";

type Props = Omit<InertiaLinkProps, 'href'> & {
  game_id: number;
  game_name: string;
  game_cover: string;
  user_id: number;
  user_name: string;
};

export const GameLink = ({ user_id, user_name, game_id, game_name, game_cover, ...props }: Props) => (
  <div className="w-32 md:w-44 xl:w-60 h-41 md:h-60 xl:h-90 p-2 mb-2 mt-2">
    <Link href={route("profile.games.show", [ user_id, game_id ])} aria-label={`Navigate to ${user_name} statistics for the game "${game_name}"`} className="relative flex items-center w-full h-full" {...props}>
      <img src={game_cover} className="relative z-10 rounded-2xl w-full h-auto" alt={`Cover image of the game "${game_name}"`} />
      <img src={game_cover} className="absolute -z-0 rounded-2xl top-0 w-32 md:w-44 xl:w-60 h-41 md:h-60 xl:h-90 blur-md" alt={`Blurred c over image of the game "${game_name}"`} />
    </Link>
  </div>
);
