import { useTranslate } from "../../Hooks/Translate/Translate"
import { Game } from "../Game/Game"

export type Props = {
  noIcon?: boolean
  game_cover: string
  game_name: string
  user_name: string
  statistics: {
    play_time: number
    game_completion: number
    similar_achievements?: number
  }
}

export const Statistics = ({ statistics, game_name, game_cover, user_name, noIcon }: Props) => {
  const { t, Translate } = useTranslate("app");
 
  return (
    <>
      {!noIcon && (
        <div className='w-32 xs:w-48 h-full'>
          <Game
            game_cover={game_cover}
            game_name={game_name}
          />
        </div>
      )}
      
      <div className='flex flex-col items-center justify-evenly h-full pl-2 pr-2 w-full'>
        <h2 className='text-text text-xl font-bold text-center self-start w-full'>
          {t("user's", { name: user_name })} <br/> {t("statistics", { game: game_name })}
        </h2>

        <div className='text-center'>
          <p><Translate>Play Time</Translate>: {(statistics.play_time/60).toFixed(0)}h</p>
          { statistics.similar_achievements != null && <p><Translate>Similar achievements</Translate>: {(statistics.similar_achievements * 100).toFixed(0)}%</p> }
          <p className='mb-auto'><Translate>Game Completion</Translate>: {(statistics.game_completion * 100).toFixed(0)}%</p>
        </div>
      </div>
    </>
  );
}