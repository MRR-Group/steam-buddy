import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { Tags } from '../Components/Tags/Tags';
import { useMemo, useState } from 'react';
import { TextInput } from '../Components/TextInput/TextInput';
import { useDebounceCallback } from 'usehooks-ts';
import { GameLink } from '../Components/GameLink/GameLink';

type Props = {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  tags: {
    name: string;
    games: number;
  }[],
  games: {
    id: number;
    cover: string;
    description: string;
    name: string;
    play_time: number;
    tags: string[];
  }[];
};

export const Library = ({ auth, games, tags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  
  const search = useDebounceCallback(setSearchText);
  const selectTag = (tag: string) => setSelectedTags(selected => [...selected, tag]);
  const unselectTag = (tag: string) => setSelectedTags(selected => selected.filter(name => name !== tag));

  const filteredGames = useMemo(() => games
    .filter((game) => selectedTags.length === 0 || selectedTags.every(tag => game.tags.includes(tag)))
    .filter((game) => searchText.length === 0 || game.name.toLowerCase().includes(searchText.trim().toLowerCase())),
  [games, selectedTags, searchText]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      title="Library"
    >
      <Head title="Library" />

      <div className="w-full flex justify-center mb-10">
        <div className="w-full 2xl:w-6/12 xl:w-7/12 lg:w-8/12 md:w-10/12 flex items-stretch flex-col media">
          <Tags selected={selectedTags} tags={tags} onSelect={selectTag} onUnselect={unselectTag} />
          <TextInput label='Search' className='mt-5' value={searchText} onInput={(e) => search(e.currentTarget.value)} />
        </div>
      </div> 

      <div className="flex w-full justify-center flex-wrap items-start">
        {filteredGames.map(({ id, cover, name }) => (
          <GameLink 
            key={id} 
            game_cover={cover} 
            game_name={name} 
            game_id={id} 
            user_id={auth.user.id}
            user_name={auth.user.name}
          />
        ))}
      </div>
    </AuthenticatedLayout>
  );
};
