import { Head, Link } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { useMemo, useState } from 'react';
import { Tags } from '../../Components/Tags/Tags';
import { TextInput } from '../../Components/TextInput/TextInput';
import { GameLink } from '../../Components/GameLink/GameLink';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';

export type ShowPageProps = {
  id: number;
  name: string;
  email: string;
  description: string;
  image: string;
  default_selected_tags: string[];
  is_owner: boolean;
  tags: {
    name: string;
    games: number;
  }[],
  games: {
    id: number;
    name: string;
    tags: string[];
    cover: string;
  }[];
};

export const Show = ({ id, name, description, email, image, games, tags, default_selected_tags, is_owner }: ShowPageProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(default_selected_tags);
  const [searchText, setSearchText] = useState<string>("");

  const search = setSearchText;
  const selectTag = (tag: string) => setSelectedTags(selected => [...selected, tag]);
  const unselectTag = (tag: string) => setSelectedTags(selected => selected.filter(name => name !== tag));

  const filteredGames = useMemo(() => games
    .filter((game) => selectedTags.length === 0 || selectedTags.every(tag => game.tags.includes(tag)))
    .filter((game) => searchText.length === 0 || game.name.toLowerCase().includes(searchText.trim().toLowerCase())),
  [games, selectedTags, searchText]);

  return (
    <AuthenticatedLayout
      user={{ id, name, email }}
      title='Profile'
    >
      <Head title="Profile" />

      <section className='flex w-full p-2 flex-col md:flex-row justify-center items-center mt-8'>
        <img src={image} alt={`Profile image of ${name}`} className='h-52 md:mr-5' />
        
          <div className='mt-5 md:mt-0'>
            <h1 className='text-text text-xl font-bold text-left'>
              {name}
            </h1>

            <div className='text-text '>
              {description}
            </div>
          </div>
      </section>
      
      {
        is_owner && (
          <div className='flex md:flex-row md:justify-between mt-2'>
            <Link href={route('profile.edit')} className="w-full md:max-w-56">
              <div className='p-2 pt-0 w-full md:max-w-80'>
                <PrimaryButton type='submit'>Edit</PrimaryButton>
              </div>
            </Link>
          </div>
        )
      }

      <section className='mt-10'>
        <h1 className='text-text text-3xl w-full text-center mb-4'>
          Games
        </h1>

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

            <TextInput label='Search' className='mt-5' value={searchText} onInput={(e) => search(e.currentTarget.value)} />
          </div>
        </div> 

        <div className="flex w-full justify-center flex-wrap items-start">
          {filteredGames.map((game) => (
            <GameLink 
              key={game.id} 
              game_cover={game.cover} 
              game_name={game.name} 
              game_id={game.id} 
              user_id={id}
              user_name={name}
            />
          ))}
        </div>
      </section>
    </AuthenticatedLayout>
  );
};
