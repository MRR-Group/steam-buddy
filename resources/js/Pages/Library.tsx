import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { Tags } from '../Components/Tags/Tags';
import { useMemo, useState } from 'react';
import { TextInput } from '../Components/TextInput/TextInput';
import { GameLink } from '../Components/GameLink/GameLink';
import { useTranslate } from '../Hooks/Translate/Translate';

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
  default_selected_tags: string[];
  games: {
    id: number;
    cover: string;
    name: string;
    tags: string[];
  }[];
};

export const Library = ({ auth, games, tags, default_selected_tags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(default_selected_tags);
  const [searchText, setSearchText] = useState<string>("");
  
  const selectTag = (tag: string) => setSelectedTags(selected => [...selected, tag]);
  const unselectTag = (tag: string) => setSelectedTags(selected => selected.filter(name => name !== tag));
  const { t } = useTranslate("app");

  const filteredGames = useMemo(() => games
    .filter((game) => selectedTags.length === 0 || selectedTags.every(tag => game.tags.includes(tag)))
    .filter((game) => searchText.length === 0 || game.name.toLowerCase().includes(searchText.trim().toLowerCase())),
  [games, selectedTags, searchText]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      title={t("Library")}
    >
      <Head title={t("Library")} />

      <div className="w-full flex justify-center mb-10">
        <div className="w-full 2xl:w-6/12 xl:w-7/12 lg:w-8/12 md:w-10/12 flex items-stretch flex-col media">
          <Tags 
            selected={selectedTags} 
            tags={tags} 
            tagRole="checkbox"
            onSelect={selectTag}
            onUnselect={unselectTag}
            itemAriaLabel={(tag, selected) => `${selected ? "Remove" : "Add"} ${tag.name} tag ${selected ? "from" : "to"} the search query`}
          />
          
          <TextInput 
            name="Search"
            label={t("Search game")}
            className='mt-5' 
            value={searchText} 
            onInput={(e) => setSearchText(e.currentTarget.value)}
          />
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
