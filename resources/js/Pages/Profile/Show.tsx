import PropTypes from 'prop-types';
import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout/AuthenticatedLayout';

type Props = {
  name: string;
  email: string;
  description: string;
}

export const Show = ({ name, email, description, image }) => {
  return (
    <AuthenticatedLayout
      user={{ name, email }}
      header={
        <div>
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Profile
          </h2>
          {description}
        </div>
      }
    >
      <Head title="Profile" />
      <img src={image} alt="" />
    </AuthenticatedLayout>
  );
};

Show.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};
