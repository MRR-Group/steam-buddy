import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { Tags } from '../../Components/Tags/Tags';
import { TextInput } from '../../Components/TextInput/TextInput';
import { GameLink } from '../../Components/GameLink/GameLink';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';

export type ShowPageProps = {
  user:{
    id: number;
    name: string;
    email: string;
  }
  mates: {
    id: number;
    name: string;
    description: string;
    image: string;
    game: {
      id: number;
      name: string;
      cover: string;
    }[];
  }[]
};

export const Show = ({user, mates}: ShowPageProps) => {
  const[mate, setMate] = useState(0)
  const {id, name, image, game} = useMemo(()=> mates[mate], [mate, mates]);
  
  const nextMate = ()=>{
    if(mate >= mates.length - 1)
      {
        setMate(0);
      }
      else
      {
        setMate(mate + 1);
      }
  }

  return (
    <AuthenticatedLayout
      user = {user}
      title='Matching'
    >
      <Head title="Matching" />
      <img src={image} alt={`Profile image of ${name}`} />
      <div>{name}</div>

      <PrimaryButton onClick={nextMate}>Next Mate</PrimaryButton>
    </AuthenticatedLayout>
  );
};
