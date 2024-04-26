import PropTypes from 'prop-types';
import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export const Edit = ({ name, email, description, status }) => {
  const{data, setData, patch}=useForm({name, description});
  const submit = (e) => {
    e.preventDefault();

    patch(route('profile.update'));
  };
  return (
    <AuthenticatedLayout
      user={{name, email}}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <form onSubmit={submit}>
                <input type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                <input type="text" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)}/>
                <button type = "submit">
                  Change
                </button>
              </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

Edit.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
};
