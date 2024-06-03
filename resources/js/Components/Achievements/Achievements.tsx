export type Props = {
  achievements: {
    id: number
    name: string
    steam_id: string
    unlocked_at: number
    description: string
    icon: string
  }[]
}

export const Achievements = ({ achievements }: Props) => {
  if (achievements.length === 0) {
    return <></>
  }
  
  return (
    <>
      <h1 className='text-text text-xl font-bold text-center self-start w-full'>
        Achievements
      </h1>
              
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
        {achievements.map((achievement) => (
          <div key={achievement.id} className='flex p-2 justify-start items-start text-text mb-3'>
            <img src={achievement.icon} alt={`Icon for the "${achievement.name}" achievement`} className='h-20 mr-5' />
      
            <div>
              <h1 className='text-xl font-bold text-left'>
                {achievement.name}
              </h1>

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