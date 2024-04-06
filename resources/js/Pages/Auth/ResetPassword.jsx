import PropTypes from 'prop-types';
import { GuestLayout } from '@/Layouts/GuestLayout/GuestLayout';
import { InputError } from '@/Components/InputError/InputError';
import { InputLabel } from '@/Components/InputLabel/InputLabel';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { TextInput } from '@/Components/TextInput/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useCleanup } from '@/Hooks/UseCleanup/UseCleanup';

export const ResetPassword = ({ token, email }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useCleanup(() => reset('password', 'password_confirmation'));

  const submit = (e) => {
    e.preventDefault();

    post(route('password.store'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            isFocused={true}
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};

ResetPassword.propTypes = {
  email: PropTypes.string,
  token: PropTypes.string,
};
