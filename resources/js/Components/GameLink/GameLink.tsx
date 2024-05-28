import { InertiaLinkProps, Link } from "@inertiajs/react";
import { Game } from "../Game/Game";

type Props = Omit<InertiaLinkProps, 'href'> & {
  game_id: number;
  game_name: string;
  game_cover: string;
  user_id: number;
  user_name: string;
};

export const GameLink = ({ user_id, user_name, game_id, game_name, game_cover, ...props }: Props) => (
  <Link href={route("profile.games.show", [ user_id, game_id ])} aria-label={`Navigate to ${user_name} statistics for the game "${game_name}"`} {...props}>
    <Game 
      game_cover={game_cover}
      game_name={game_name}
    />
  </Link>
);
