import { Head, useForm } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { PrimaryButton } from '../../Components/PrimaryButton/PrimaryButton';
import { TextInput } from '../../Components/TextInput/TextInput';
import { TextArea } from '../../Components/TextArea/TextArea';
import { useTranslate } from '../../Hooks/Translate/Translate';

export type EditPageProps = {
  id: number;
  image: string,
  name: string;
  email: string;
  description: string;
};

export const Edit = ({ id, name, image, email, description }: EditPageProps) => {
  const { data, setData, patch } = useForm({ name, description });
  const { t, Translate } = useTranslate("app");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    patch(route('profile.update'));
  };
  return (
    <AuthenticatedLayout
      user={{ id, name, email }}
      title={t("Profile")}
    >
      <Head title={t("Profile")} />
    
      <form onSubmit={submit}>
        <div className='flex w-full p-2 flex-col md:flex-row justify-center items-center mt-8'>
          <img src={image} alt={t(`Profile image of user`, { name })} className='h-52 md:mr-5' />
          
          <div className='mt-5 md:mt-0 w-full h-full'>
            <TextInput
              name="name"
              label={t("Name")}
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />

            <TextArea
              label={t("Description")}
              name="description"
              className='min-h-60 md:min-h-36 mt-4'
              areaClassName='min-h-60 md:min-h-36'
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
          </div>
        </div>
    
        <div className='flex md:flex-row md:justify-between mt-2'>
          <div className='p-2 pt-0 w-full md:max-w-56'>
            <PrimaryButton type='submit'>
              <Translate>Save</Translate>
            </PrimaryButton>
          </div>
        </div>
      </form>
    </AuthenticatedLayout>
  );
};