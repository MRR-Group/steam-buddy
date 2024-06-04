import { useTranslate } from "../../Hooks/Translate/Translate";

type Props = {
  game_name: string,
  game_cover: string,
  className?: string,
  imgClassName?: string,
  blurredImgClassName?: string,
};

export const Game = ({ game_name, game_cover, className = "", imgClassName = "", blurredImgClassName = "" }: Props) => {
  const { t } = useTranslate("app");

  return (
    <div className={`max-w-[600px] w-full h-full flex justify-center items-center ${className}`}>
      {/* percentage padding value is always related to width of the parent element. We use it here to keep aspect ratio 9/6 */}
      <div className="relative flex w-full items-center overflow-hidden pt-[150%] rounded-2xl ">
        <img src={game_cover} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-auto h-auto object-center object-cover ${imgClassName}`} alt={t(`Cover image of the game`, { game: game_name })} />
        <img src={game_cover} className={`w-full h-full top-0 left-0 object-cover absolute -z-0 blur-md ${blurredImgClassName}`} alt={t(`Blurred cover image of the game`, { game: game_name })} />
      </div>
    </div>
  );
}