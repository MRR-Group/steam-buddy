import { Head, useForm } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';

export type EditPageProps = {
  id: number;
  name: string;
  email: string;
  description: string;
};

export const Edit = ({ id, name, email, description }: EditPageProps) => {
  const { data, setData, patch } = useForm({ name, description });
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    patch(route('profile.update'));
  };
  return (
    <AuthenticatedLayout
      title='Edit Profile'
      user={{ id, name, email }}
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <form onSubmit={submit}>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              <input
                type="text"
                name="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
              <button type="submit">Change</button>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
