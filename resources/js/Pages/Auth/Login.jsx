import PropTypes from 'prop-types';
import { GuestLayout } from '@/Layouts/GuestLayout/GuestLayout';
import { InputError } from '@/Components/InputError/InputError';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { TextInput } from '@/Components/TextInput/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useCleanup } from '@/Hooks/UseCleanup/UseCleanup';
import { TextInputOption } from '@/Components/TextInputOption/TextInputOption';

export const Login = ({ status }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useCleanup(() => () => reset('password'), []);

  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout status={status}>
      <Head title="Log in" />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-3xl pb-6">Log in</div>

        <div className="pb-6">
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={data.email}
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />

          <TextInputOption
            left="You don't have an account?"
            linkText={`Click${'\u00A0'}here`}
            right={`to${'\u00A0'}register`}
            href={route('register')}
          />
        </div>

        <div className="pb-6">
          <TextInput
            type="password"
            name="password"
            label="Password"
            value={data.password}
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />

          <TextInputOption
            left="You don't remember?"
            linkText={`Click${'\u00A0'}here`}
            right={`to${'\u00A0'}reset it.`}
            href={route('password.request')}
          />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}>Log in</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};

Login.propTypes = {
  status: PropTypes.node,
};
