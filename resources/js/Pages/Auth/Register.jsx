import { GuestLayout } from '@/Layouts/GuestLayout/GuestLayout';
import { InputError } from '@/Components/InputError/InputError';
import { PrimaryButton } from '@/Components/PrimaryButton/PrimaryButton';
import { TextInput } from '@/Components/TextInput/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useCleanup } from '@/Hooks/UseCleanup/UseCleanup';
import { TextInputOption } from '@/Components/TextInputOption/TextInputOption';

export const Register = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    password_confirmation: '',
  });

  useCleanup(() => reset('password', 'password_confirmation'));

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form
        onSubmit={submit}
        className="max-w-80 w-full"
        style={{ padding: 'calc(50% - 10rem) 0' }}
      >
        <div className="text-center text-text text-3xl pb-6">Register</div>

        <div className="pb-6">
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />

          <TextInputOption
            left="Do you have an account?"
            linkText={`Click${'\u00A0'}here`}
            right={`to${'\u00A0'}log in.`}
            href={route('login')}
          />
        </div>

        <div className="pb-10">
          <TextInput
            type="password"
            name="password"
            label="Password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="pb-10">
          <TextInput
            type="password"
            name="password_confirmation"
            label="Confirm Password"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex justify-center w-full">
          <PrimaryButton disabled={processing}>Register</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};
