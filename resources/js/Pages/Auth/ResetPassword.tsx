import PropTypes from 'prop-types';
import { GuestLayout } from '@/Layouts/GuestLayout/GuestLayout';
import { InputError } from '@/Components/InputError/InputError';
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

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.store'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-3xl pb-6">
          Reset Password
        </div>

        <div className="pb-10">
          <TextInput
            type="password"
            name="password"
            label="Password"
            value={data.password}
            autoComplete="new-password"
            isFocused={true}
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="pb-10">
          <TextInput
            type="password"
            name="password_confirmation"
            label="Confirm Password"
            value={data.password_confirmation}
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}> Reset Password</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};

ResetPassword.propTypes = {
  email: PropTypes.string,
  token: PropTypes.string,
};
