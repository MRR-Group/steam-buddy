import { InertiaLinkProps, Link } from "@inertiajs/react";
import { Game } from "../Game/Game";
import { useTranslate } from "../../Hooks/Translate/Translate";

type Props = Omit<InertiaLinkProps, 'href'> & {
  game_id: number,
  game_name: string,
  game_cover: string,
  user_id: number,
  user_name: string,
};

export const GameLink = ({ user_id, user_name, game_id, game_name, game_cover, ...props }: Props) => {
  const { t } = useTranslate("app");

  return (
    <Link href={route("profile.games.show", [ user_id, game_id ])} aria-label={t("Navigate to user statistics for the game", { user: user_name, game: game_name })} className="" {...props}>
      <Game 
        className="w-36 xs:w-44 xl:w-60 p-2"
        game_cover={game_cover}
        game_name={game_name}
      />
    </Link>
  );
};
