type Props = {
  game_name: string;
  game_cover: string;
  className?: string;
  imgClassName?: string;
  blurredImgClassName?: string;
};

export const Game = ({ game_name, game_cover, className = "", imgClassName = "", blurredImgClassName = "" }: Props) => (
  <div className={`w-32 md:w-44 xl:w-60 h-41 md:h-60 xl:h-90 p-2 mb-2 mt-2 ${className}`}>
    <div className="relative flex items-center w-full h-full">
      <img src={game_cover} className={`relative z-10 rounded-2xl w-full h-auto ${imgClassName}`} alt={`Cover image of the game "${game_name}"`} />
      <img src={game_cover} className={`absolute -z-0 rounded-2xl top-0 w-32 md:w-44 xl:w-60 h-41 md:h-60 xl:h-90 blur-md ${blurredImgClassName}`} alt={`Blurred cover image of the game "${game_name}"`} />
    </div>
  </div>
);
