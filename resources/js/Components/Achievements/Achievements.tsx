import { useTranslate } from "../../Hooks/Translate/Translate"

export type Props = {
  achievements: {
    id: number,
    name: string,
    steam_id: string,
    unlocked_at: number,
    description: string,
    icon: string,
  }[],
}

export const Achievements = ({ achievements }: Props) => {
  const { t, Translate } = useTranslate("app");

  if (achievements.length === 0) {
    return <></>
  }
  
  return (
    <>
      <h2 className='text-text text-xl font-bold text-center self-start w-full'>
        <Translate>Achievements</Translate>
      </h2>
              
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
        {achievements.map((achievement) => (
          <div key={achievement.id} className='flex p-2 justify-start items-start text-text mb-3'>
            <img src={achievement.icon} alt={t(`Icon for the achievement`, { name: achievement.name })} className='h-20 mr-5' />
      
            <div>
              <h3 className='text-xl font-bold text-left'>
                {achievement.name}
              </h3>

              <div>
                {achievement.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}